import React, { useEffect, useState } from 'react';

import { Slider } from '../src';

export default {
  title: 'Components/Form/Slider',
  component: Slider,
};

export const SliderStory = () => {
  const [value, setValue] = useState(20);

  useEffect(() => console.log({ value }), [value]);

  return (
    <Slider value={value} onChange={setValue} min={0} max={100} step={10} />
  );
};
