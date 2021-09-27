import React, { useMemo } from 'react';

import { Form, useForm } from '../src';

export default {
  title: 'Components/Base/Form',
  component: Form,

  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: '表单',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Form></Form>`,
      },
    },
  },
};

export const FormStory = () => {
  const formItems = useMemo(() => {
    return [
      {
        key: 'test',
        label: '测试',
        content: <input placeholder="请输入" />,
      },
    ];
  });

  const { formItemDoms } = useForm(formItems, { test: 111 });

  return <div>{Object.values(formItemDoms)}</div>;
};
