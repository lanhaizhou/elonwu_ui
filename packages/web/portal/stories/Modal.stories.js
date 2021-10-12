import React, { useState } from 'react';

import { Button } from '@elonwu/web-button';
import { Title } from '@elonwu/web-text';

import { Modal, useModal } from '../src';

export default {
  title: 'Components/Portal/Modal',
  component: Modal,
};

export const ModalStory = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Title>{visible ? '打开' : '关闭'}</Title>
      <Modal
        visible={visible}
        onChange={setVisible}
        trigger={<Button>Show Modal</Button>}
        // triggerEvents={['hover']}
      >
        <ModalContent />
      </Modal>
    </div>
  );
};

const ModalContent = () => {
  const { visible, onDismiss } = useModal();

  return (
    <>
      <Title>{visible ? '打开' : '关闭'}</Title>
      <Button onClick={onDismiss}>Close Modal</Button>
    </>
  );
};
