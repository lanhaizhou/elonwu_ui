import React, { useState, useEffect } from 'react';

import { Button } from '@elonwu/web-button';
import { Title } from '@elonwu/web-text';

import { Message, useMessage } from '../src';

export default {
  title: 'Components/Portal/Message',
  component: Message,
};

export const MessageStory = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Message
        visible={visible}
        onChange={setVisible}
        trigger={<Button>Show Message</Button>}
      >
        <Title>This is a message.</Title>
      </Message>
    </div>
  );
};
