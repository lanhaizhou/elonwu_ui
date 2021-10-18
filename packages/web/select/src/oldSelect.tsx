import React from 'react';
import classnames from 'classnames';
import useSelect from './useSelect';
import { ISelectProps } from '.';
import './index.less';

export const OldSelect = (props: ISelectProps) => {
  const { multiple } = props;
  const {
    selectData,
    selectedAll,
    handleClickItem,
    handleClickAll,
  } = useSelect({ ...props });
  const allSelectedClass = classnames('all', { select: selectedAll });
  return (
    <div className="demon-select-container">
      <div className="options-box">
        {multiple && (
          <div className={allSelectedClass} onClick={handleClickAll}>
            全部
          </div>
        )}

        <div className="options">
          {selectData.map((item, index) => (
            <div
              key={item.value}
              className={classnames('options-item', {
                select: item?.selected,
                disabled: item?.disabled,
              })}
              onClick={() => handleClickItem(item, index)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
