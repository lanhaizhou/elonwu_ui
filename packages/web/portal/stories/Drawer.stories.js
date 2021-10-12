import React, { useState } from 'react';

import { Button } from '@elonwu/web-button';
import { Title } from '@elonwu/web-text';
import { Card } from '@elonwu/web-card';

import { Drawer, useDrawer } from '../src';

export default {
  title: 'Components/Portal/Drawer',
  component: Drawer,
};

export const DrawerStory = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Title>{visible ? '打开' : '关闭'}</Title>
      <Drawer
        visible={visible}
        onChange={setVisible}
        trigger={<Button>Show Drawer</Button>}
      >
        <DrawerContent />
      </Drawer>
    </div>
  );
};

const DrawerContent = () => {
  const { visible, onDismiss } = useDrawer();

  return (
    <div
      style={{
        width: 400,
        height: '100%',
        overflow: 'auto',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <Title>{visible ? '打开' : '关闭'}</Title>
      <Button onClick={onDismiss}>Close Drawer</Button>
    </div>
  );
};
