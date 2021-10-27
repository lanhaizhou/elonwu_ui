import React, { FC, CSSProperties, useMemo, useState, useEffect } from 'react';

import { Icon } from '@elonwu/web-icon';
import { Button } from '@elonwu/web-button';
import { Text } from '@elonwu/web-text';

import reload from './assets/reload.svg';

import './style.css';

interface LoadingProps {
  desc?: string;
  loading?: boolean;
  style?: CSSProperties;
}

export const Loading: FC<LoadingProps> = ({
  children,
  loading,
  desc = 'Loading',
  style = {},
}) => {
  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      setVisible(true);
    } else {
      timer = setTimeout(() => setVisible(false), 250);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  const leaving = useMemo(() => {
    return !loading && visible;
  }, [visible, loading]);

  return (
    <div className="loading">
      {children}

      {visible ? (
        <div
          className={`loadingOverlay ${leaving ? 'leaving' : ''}`}
          style={style}
        >
          <Icon src={reload} type="ghost" />
          <Text>{desc}</Text>
        </div>
      ) : null}
    </div>
  );
};
