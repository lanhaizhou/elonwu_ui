import React from 'react';
import { Toggle } from '../src';

export default {
  title: 'Components/base/toggle',
  component: Toggle,
};

export const ToggleStory = () => {
  return (
    <div>
      <div style={{ padding: '4px 0' }}>
        <Toggle type="radio" size="lg">
          Radio
        </Toggle>
      </div>
      <div style={{ padding: '4px 0' }}>
        <Toggle type="checkbox" size="md">
          <span style={{ color: 'skyblue' }}>checkbox</span>
        </Toggle>
      </div>
      <div style={{ padding: '4px 0' }}>
        <Toggle type="switch" checkedText="开始" unCheckedText="关闭">
          Switch
        </Toggle>
      </div>
    </div>
  );
};
