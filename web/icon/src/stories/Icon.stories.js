import React from 'react';
import { Icon } from '../index';

/**
 * 素材
 */
import star from '../assets/star.svg';
import diamond from '../assets/diamond.svg';
import userCheck from '../assets/user_check.svg';
import userPlus from '../assets/user_plus.svg';
import creditCard from '../assets/credit_card.svg';
import trendingDown from '../assets/trending_down.svg';
import trendingUp from '../assets/trending_up.svg';
import empty from '../assets/empty.svg';
// import arrowLeft from '../assets/arrow_left.svg';
// import arrowRight from '../assets/arrow_right.svg';
// import arrowDown from '../assets/arrow_down.svg';
// import close from '../assets/close.svg';
// import question from '../assets/question.svg';
// import dustbin from '../assets/dustbin.svg';
// import home from '../assets/home.svg';
// import lost from '../assets/lost.svg';
// import userVoice from '../assets/user_voice.svg';
// import menu from '../assets/menu.svg';
// import online from '../assets/online.svg';
// import device from '../assets/device.svg';
// import chart from '../assets/chart.svg';
// import reload from '../assets/reload.svg';
// import edit from '../assets/edit.svg';
// import download from '../assets/download.svg';
// import plus from '../assets/plus.svg';
// import plusCircle from '../assets/plus_circle.svg';
// import email from '../assets/email.svg';
// import settings from '../assets/settings.svg';
// import search from '../assets/search.svg';
// import main from '../assets/main.svg';
// import loading from '../assets/loading.svg';
// import check from '../assets/check.svg';

export default {
  title: 'Components/base/Icon',
  component: Icon,

  // 参数值、参数文档
  argTypes: {
    type: {
      name: 'type',
      description: '按钮类型',
      defaultValue: 'fill',
      options: ['fill', 'outline', 'ghost'],
      control: {
        type: 'select',
        labels: { fill: '填充', outline: '线框', ghost: '虚拟' },
      },

      table: {
        type: {
          summary: 'enum',
          detail: `
            fill: 填充, outline: 线框, ghost: 虚拟
          `,
        },
        defaultValue: {
          summary: 'fill',
        },
      },
    },
    size: {
      name: 'size',
      description: '按钮大小',
      defaultValue: 'md',
      options: ['md', 'sm', 'lg'],
      control: {
        type: 'select',
        labels: { md: '默认', sm: '小', lg: '大' },
      },

      table: {
        type: {
          summary: 'enum',
          detail: `
            md: 默认, sm: 小, lg: 大
          `,
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    round: {
      name: 'round',
      description: '是否圆角',
      defaultValue: false,
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
  },

  // 组件文档
  parameters: {
    docs: {
      // 组件整体描述
      description: {
        component: '按钮',
      },
      // 代码示例
      source: {
        type: 'code',
        code: `<Button>Elon Button</Button>`,
      },
    },
  },
};

const Template = (args) => <Icon {...args} />;

export const Star = Template.bind({});
Star.args = {
  src: star,
};

export const Diamond = Template.bind({});
Diamond.args = {
  src: diamond,
};

export const UserCheck = Template.bind({});
UserCheck.args = {
  src: userCheck,
};

export const UserPlus = Template.bind({});
UserPlus.args = {
  src: userPlus,
};

export const CreditCard = Template.bind({});
CreditCard.args = {
  src: creditCard,
};

export const TrendingDown = Template.bind({});
TrendingDown.args = {
  src: trendingDown,
};

export const TrendingUp = Template.bind({});
TrendingUp.args = {
  src: trendingUp,
};

export const Empty = Template.bind({});
Empty.args = {
  src: empty,
};
