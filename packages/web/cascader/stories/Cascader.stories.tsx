import React from 'react';
import { Cascader } from '../src';

export default {
  title: 'Components/Form/Cascader',
  component: Cascader,
};

export const CascaderStory = () => {
  const options = [
    {
      label: '福建',
      value: 'fj',
      children: [
        {
          label: '福州',
          value: 'fuzhou',
          children: [
            {
              label: '马尾',
              value: 'mawei',
            },
          ],
        },
        {
          label: '泉州',
          value: 'quanzhou',
        },
      ],
    },
    {
      label: '浙江',
      value: 'zj',
      children: [
        {
          label: '杭州',
          value: 'hangzhou',
          children: [
            {
              label: '余杭',
              value: 'yuhang',
            },
          ],
        },
      ],
    },
    {
      label: '北京',
      value: 'bj',
      children: [
        {
          label: '朝阳区',
          value: 'chaoyang',
        },
        {
          label: '海淀区',
          value: 'haidian',
        },
      ],
    },
  ];

  const onchange = (value: any, selectedOptions: any) => {
    console.log('value', value);
    console.log('selectedOptions', selectedOptions);
  };

  return (
    <div>
      <Cascader
        className="rc-cascader-demon-input"
        placeholder="please select ..."
        expandTrigger="hover"
        options={options}
        onChange={onchange}
      />
    </div>
  );
};
