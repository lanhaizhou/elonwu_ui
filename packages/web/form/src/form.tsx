import tw, { styled, css } from 'twin.macro';
/**
 *  From
 */
import React, {
  useMemo,
  useCallback,
  FC,
  CSSProperties,
  FormEventHandler,
} from 'react';
import {
  useForm as useReactHookForm,
  Controller,
  useWatch as useOriginWatch,
  UseFormReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from 'react-hook-form';

import { throttle } from 'lodash';

import { Text } from '@elonwu/web-text';
import { isNil, isValidArray } from '@elonwu/utils';

interface Rules {
  required?: boolean;
  validate: any;
}

interface FormItemProps {
  key: string;
  label?: string;
  content: JSX.Element;
  options?: {
    initialValue?: any;
    rules?: Rules;
    // 控制表单检测时机
    validateAfterChange?: boolean;
    validateAfterBlur?: boolean;
  };
  // 控制样式
  formItemStyle: CSSProperties;
  labelStyle: CSSProperties;
  errorStyle: CSSProperties;
}

interface LabelPorps {
  label?: string;
  style?: CSSProperties;
  rules?: Rules;
}

interface ErrorMsgProps {
  style?: CSSProperties;
}

// 其实没有实质影响， 主要是避免触发自动提交的刷新， 也提供一个页面上表单区域的标识
export const Form = ({ style = {}, ...rest }) => {
  const stopDefault: FormEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <form
      style={{ width: '100%', ...style }}
      onSubmit={stopDefault}
      className="ElonForm"
      {...rest}
    />
  );
};

// react-hook-form 再封装
export const useForm = (formItems: FormItemProps[], defaultValues: any) => {
  const methods: UseFormReturn = useReactHookForm({ defaultValues });
  const { getValues, handleSubmit } = methods;

  const formItemDoms: { [key: string]: JSX.Element } = useMemo(() => {
    let formItemDoms = {};

    if (isValidArray(formItems)) {
      formItems.forEach((formItem) => {
        const key = formItem.key;

        formItemDoms[key] = (
          <FormItemController key={key} methods={methods} formItem={formItem} />
        );
      });
    }

    return formItemDoms;
  }, [formItems, methods]);

  // 检测并返回数据
  const onValidate = useCallback(
    throttle(
      () =>
        new Promise((resolve) =>
          handleSubmit(
            () => resolve({ error: null, values: getValues() }),
            (error) => resolve({ error }),
          )(),
        ),
      300,
    ),
    [getValues, handleSubmit],
  );

  return { formItemDoms, onValidate, ...methods };
};

// react-hook-form 的 controller 用来承载第三方的输入组件
const FormItemController = ({
  methods,
  formItem,
}: {
  methods: UseFormReturn;
  formItem: FormItemProps;
}) => {
  // 默认值
  const rules = formItem?.options?.rules;
  const initialValue = formItem?.options?.initialValue;

  // 检测规则
  const controlRules = useMemo(() => {
    return Object.assign(
      {},
      formItem?.options?.rules,
      rules?.required && {
        required: {
          value: true,
          message: `${formItem?.label || '此项'} 是必填的`,
        },
      },
    );
  }, [formItem]);

  return (
    <Controller
      name={formItem?.key}
      control={methods?.control}
      rules={controlRules}
      defaultValue={initialValue}
      render={({ field, fieldState }) => (
        <FormItemRenderer
          field={field}
          fieldState={fieldState}
          methods={methods}
          formItem={formItem}
        />
      )}
    />
  );
};

/**
 * Renderer
 */
const FormItemRenderer = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState, // { invalid, isTouched, isDirty, error }
  methods: { trigger, watch, control },
  formItem: {
    key,
    label,
    // 表单组件
    content,
    options = {},
    // 控制样式
    formItemStyle,
    labelStyle,
    errorStyle,
  },
}: {
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
  methods: UseFormReturn;
  formItem: FormItemProps;
}) => {
  const {
    rules,
    // 控制表单检测时机
    validateAfterChange = true,
    validateAfterBlur = false,
  } = options;

  // 错误信息
  const errMsg = useMemo(() => fieldState?.error?.message, [fieldState]);

  const props = useMemo(
    () =>
      Object.assign({}, content?.props, {
        value,
        // fieldState,
        onChange: (...args: any[]) => {
          if (content.props.disabled) return;
          // 触发 controller 的 onChange,
          onChange(...args);
          // 触发输入检测
          if (validateAfterChange) trigger(key);
        },

        onBlur: () => {
          if (content.props.disabled) return;
          // 触发 controller 的 onBlur,
          onBlur();
          // 触发输入检测
          if (validateAfterBlur) trigger(key);
        },
      }),
    [
      content,
      value,
      fieldState,
      trigger,
      validateAfterChange,
      validateAfterBlur,
    ],
  );

  // TODO 出错时滚动到视野内
  // const { errors } = useFormState({ control, name: [key] });
  // useEffect(() => {
  //   console.log({ errors });
  //   if (errors?.[key]?.ref) {
  //     console.log({
  //       current: errors[key].ref?.current,
  //     });

  //     errors[key].ref?.current?.scrollIntoView({
  //       behavior: 'smooth',
  //     });
  //   }
  // }, [key, errors]);

  return (
    <div key={key} className="FormItem" style={formItemStyle} ref={ref}>
      {/* label */}
      <LabelMsg style={labelStyle} rules={rules} label={label} />

      {/* 表单组件 */}
      {/* {React.cloneElement(content, props, ref)} */}
      {React.cloneElement(content, props)}

      {/* 错误信息 */}
      <ErrorMsg style={errorStyle}>{errMsg}</ErrorMsg>
    </div>
  );
};

/**
 * Label
 */

const Label = styled.label(() => {
  return [
    tw`font-serif font-normal`,
    tw`text-gray-700 dark:text-gray-50`,
    tw`select-none`,
  ];
});

const LabelMsg: FC<LabelPorps> = ({ label, style, rules }) => {
  if (isNil(label)) return null;

  return (
    <Label style={style}>
      {/* 必填标识 */}
      {rules?.required && (
        <span
          style={{
            all: 'inherit',
            color: '#ff5050',
            display: 'inline-block',
            margin: 4,
          }}
        >
          *
        </span>
      )}
      {/* label */}
      {label}:
    </Label>
  );
};

/**
 * ErrorMsg
 */
const ErrorMsg: FC<ErrorMsgProps> = ({ children, style }) => {
  if (isNil(children)) return null;

  return (
    <Text style={Object.assign({ maxWidth: `100%`, color: '#ff5050' }, style)}>
      {children}
    </Text>
  );
};

export const useWatch = useOriginWatch;
