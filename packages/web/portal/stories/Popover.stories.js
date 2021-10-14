import React, { useState } from 'react';

import { Button } from '@elonwu/web-button';
import { Title } from '@elonwu/web-text';
import { Card } from '@elonwu/web-card';

import { Popover, usePopover } from '../src';

export default {
  title: 'Components/Portal/Popover',
  component: Popover,
};

export const PopoverStory = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Popover
        visible={visible}
        onChange={setVisible}
        trigger={<Button>Show Popover</Button>}
      >
        <PopoverContent />
      </Popover>
    </div>
  );
};

const PopoverContent = () => {
  const { visible, onDismiss } = usePopover();

  return (
    <Card
      style={{
        // width: 400,
        // height: '100%',
        overflow: 'auto',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <Title>{visible ? '打开' : '关闭'}</Title>
      <Button onClick={onDismiss}>Close Popover</Button>
    </Card>
  );
};
