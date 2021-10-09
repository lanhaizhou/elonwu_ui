import React, { CSSProperties } from 'react';
// 引入编辑器组件
import BraftEditor, { EditorState, BuiltInControlType } from 'braft-editor';
import 'braft-editor/dist/index.css';

// 引入图表
import table from 'braft-extensions/dist/table';
import 'braft-extensions/dist/table.css';

import './style.css';

BraftEditor.use(
  table({
    defaultColumns: 5,
    defaultRows: 3,
    exportAttrString: `border="1" class="braft-table"`,
  }),
);

const defaultControls: BuiltInControlType[] = [
  'fullscreen',
  'undo',
  'redo',

  'separator',
  'link',

  'separator',
  'text-color',
  'bold',
  'underline',
  'strike-through',
  'font-size',
  'line-height',

  'separator',
  'text-align',
  'letter-spacing',

  'separator',
  'table',
  // 'media',
];

const colors = [
  '#000000',
  '#333333',
  '#666666',
  '#999999',
  '#cccccc',
  '#ffffff',
  '#61a951',
  '#16a085',
  '#07a9fe',
  '#003ba5',
  '#8e44ad',
  '#610603',
  '#c0392b',
  '#d35400',
  '#f39c12',
  '#fdda00',
  '#7f8c8d',
  '#2c3e50',
  '#00FFFF00',
];

interface BraftProps {
  placeholder?: string;
  style?: CSSProperties;
  value?: EditorState;
  onChange?: (state: EditorState) => void;
  controls?: BuiltInControlType[];
}

export const Braft = ({
  placeholder,
  style,
  value,
  onChange,
  controls,
}: BraftProps) => {
  return (
    <div
      style={{
        border: '1px solid #ededed',
        background: '#fff',
        borderRadius: 8,
        padding: `4px`,
        boxShadow: `0px 0px 6px 0 rgba(0,0,0,.1)`,
        ...style,
      }}
    >
      <BraftEditor
        placeholder={placeholder}
        contentStyle={style}
        value={value}
        onChange={onChange}
        controls={controls || defaultControls}
        colors={colors}
      />
    </div>
  );
};
