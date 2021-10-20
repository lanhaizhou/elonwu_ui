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
    <div style={{ height: 200, overflow: 'auto', border: '1px solid #ededed' }}>
      <Card style={{ height: 400 }}>This is prev</Card>

      <Popover
        visible={visible}
        onChange={setVisible}
        trigger={<Button>Show Popover</Button>}
        triggerEvents={['safeHover']}
        position="bottom"
        offset={{ y: 16 }}
      >
        <Card>
          <Title>This is popover.</Title>
        </Card>
      </Popover>
    </div>
  );
};
