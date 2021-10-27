import ReactDOM from 'react-dom';

import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  CSSProperties,
  useEffect,
  ReactPortal,
  ReactNode,
  MutableRefObject,
  ReactElement,
} from 'react';

import { isValidArray } from '@elonwu/utils';

// 弹出类型
export type PortalType =
  | 'Modal'
  | 'Drawer'
  | 'Notice'
  | 'Message'
  | 'Tooltip'
  | 'Popover';

// 触发方式
// TODO 待完善
export type TriggerEvent = 'click' | 'hover' | 'safeHover';

// 相对锚点的定位
export type Position =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'cover';

export interface Offset {
  x?: number;
  y?: number;
}

export interface PortalProps {
  // 弹出类型， 用于选择不同容器
  portalType: PortalType;

  // 弹出内容
  content?: ReactNode;

  // 弹出触发器
  trigger: ReactElement;
  triggerEvents?: TriggerEvent[];

  // 状态受控
  visible?: boolean;
  onChange: (visible: boolean) => void;

  // 样式覆盖
  contentStyle?: CSSProperties;
  overlayStyle?: CSSProperties;

  // 弹出内容根据锚点和相对距离定位， 默认以 target 为 锚点
  anchorRef?: MutableRefObject<HTMLElement>;
  position?: Position;
  offset?: Offset;
}

export interface PortalResult {
  // 状态
  visible: boolean;
  // 状态操作
  onShow: () => void;
  onDismiss: () => void;
  // portal 内容， 用于渲染到界面
  portalContent: ReactNode;
}

export const usePortal = ({
  portalType,
  contentStyle,
  overlayStyle,
  visible: overrideVisible,
  content,
  onChange,
  trigger,
  triggerEvents,
  anchorRef,
  position,
  offset,
}: PortalProps): PortalResult => {
  const [visible, setVisible] = useState<boolean>(false);

  const [portal, setPortal] = useState<ReactPortal | null>();

  const triggerRef = useRef<HTMLElement | undefined>();

  /********************
   * portal 容器
   **/
  const portalContainer: HTMLDivElement = useMemo(() => {
    // 优先复用容器
    let portalContainer: HTMLDivElement | null = document.body.querySelector(
      `#root ~ #${portalType}`,
    );

    if (!portalContainer) {
      // 创建容器
      portalContainer = document.createElement('div');

      portalContainer.id = portalType;

      document.body.appendChild(portalContainer);
    }

    return portalContainer;
  }, [portalType]);

  /**
   * portal 容器
   ********************/

  /********************
   * overlay 容器
   **/

  // overlay 容器样式
  const overlayRef = useRef<HTMLDivElement>(document.createElement('div'));

  const overrideOverlayStyle = useMemo(() => {
    return Object.assign(
      // 默认样式
      { width: '100vw' },
      overlayStyle,
      visible ? { visibility: 'visible' } : { visibility: 'hidden', hiehgt: 0 },
    );
  }, [overlayStyle, visible]);

  useEffect(() => {
    const overlayContainer = overlayRef.current;

    overlayContainer.classList.add(`overlay-container`);

    // 覆盖样式
    if (overrideOverlayStyle && Object?.keys(overrideOverlayStyle)?.length) {
      for (let [key, value] of Object.entries(overrideOverlayStyle)) {
        overlayContainer.style[key] = value;
      }
    }

    // 添加到 portal 容器
    portalContainer.appendChild(overlayContainer);

    // 清除 overlay
    return () => {
      portalContainer.removeChild(overlayContainer);
    };
  }, [portalContainer, overrideOverlayStyle]);

  /**
   * overlay 容器
   ********************/

  /********************
   * 状态控制
   **/
  const onShow = useCallback(() => {
    onChange ? onChange(true) : setVisible(true);
  }, [onChange]);

  const onDismiss = useCallback(() => {
    overlayRef?.current?.classList.add('leaving');

    setTimeout(() => {
      overlayRef?.current?.classList.remove('leaving');

      onChange ? onChange(false) : setVisible(false);
    }, 250);
  }, [onChange]);

  useEffect(() => {
    if (typeof overrideVisible === 'boolean' && visible !== overrideVisible) {
      setVisible(overrideVisible);
    }
  }, [visible, overrideVisible]);

  /**
   * 状态控制
   ********************/

  /********************
   * 内容
   **/

  useEffect(() => {
    if (visible) {
      const overlayContainer = overlayRef.current;

      const contentId: string = `content-container-${Date.now()}`;

      const anchorPosition = calcAnchorPosition({
        position,
        offset,
        ref: anchorRef || triggerRef,
      });

      const contentContainer = React.createElement(
        'div',
        {
          id: contentId,
          style: Object.assign({}, contentStyle, anchorPosition),
        },
        content,
      );

      // 将内容添加到 overlay
      const portal = ReactDOM.createPortal(contentContainer, overlayContainer);
      setPortal(portal);
    } else {
      setPortal(null);
    }
  }, [visible, content, contentStyle]);
  /**
   * 内容
   ********************/

  /********************
   * 触发器
   **/
  const triggerDom = useMemo(() => {
    const eventProps: any = {};

    if (isValidArray(triggerEvents)) {
      triggerEvents?.forEach((type) => {
        switch (type) {
          case 'click':
            eventProps.onClick = onShow;
            break;

          case 'hover':
            eventProps.onMouseEnter = onShow;
            break;

          case 'safeHover':
            eventProps.onMouseEnter = onShow;

            // overlay 会导致错误
            eventProps.onMouseLeave = onDismiss;
            break;
        }
      });
    } else {
      eventProps.onClick = onShow;
    }
    return React.cloneElement(
      trigger,
      Object.assign({}, eventProps, { ref: position ? triggerRef : null }),
    );
  }, [trigger, triggerEvents, position, onShow, onDismiss]);
  /**
   * 触发器
   ********************/

  return {
    visible,
    onShow,
    onDismiss,
    portalContent: (
      <>
        {triggerDom}
        {portal}
      </>
    ),
  };
};

const calcAnchorPosition = ({
  position,
  ref,
  offset,
}: {
  position?: Position;
  ref?: MutableRefObject<HTMLElement | undefined>;
  offset?: Offset;
}): CSSProperties | undefined => {
  if (!position) return;

  let anchorPosition: CSSProperties = { position: 'absolute' },
    offsetX = offset?.x || 0,
    offsetY = offset?.y || 0;

  const { top, left, width, height } = (
    ref?.current || document.body
  ).getBoundingClientRect();

  switch (position) {
    case 'cover':
      anchorPosition.left = left;
      anchorPosition.top = top;
      anchorPosition.width = width;
      anchorPosition.height = height;
      break;

    case 'bottom':
      anchorPosition.left = left + width / 2;
      anchorPosition.top = top + height + offsetY;
      break;

    case 'bottomLeft':
    default:
      anchorPosition.left = left;
      anchorPosition.top = top + height + offsetY;
      break;
  }

  return anchorPosition;
};
