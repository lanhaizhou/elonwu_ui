import React, { ChangeEventHandler, FC } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = (props) => {
  const { min, max, step, value, onChange } = props;

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(parseFloat(e.target.value))
      }
    />
  );
};
