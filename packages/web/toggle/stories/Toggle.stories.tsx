import React from 'react';
import { Toggle } from '../src';

export default {
  title: 'Components/Form/Toggle',
  component: Toggle,
};

export const ToggleStory = () => {
  return (
    <div>
      <div style={{ padding: '4px 0' }}>
        <Toggle type="radio" size="lg">
          Radio
        </Toggle>

        <Toggle type="radio" size="md">
          Radio
        </Toggle>

        <Toggle type="radio" size="sm">
          Radio
        </Toggle>
      </div>
      <div style={{ padding: '4px 0' }}>
        <Toggle type="checkbox" size="lg">
          checkbox
        </Toggle>

        <Toggle type="checkbox" size="md">
          checkbox
        </Toggle>

        <Toggle type="checkbox" size="sm">
          checkbox
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
