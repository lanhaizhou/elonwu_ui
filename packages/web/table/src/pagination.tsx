import React, { CSSProperties } from 'react';
import RcPagination from 'rc-pagination';
import { IPaginationProps } from '.';
import './pagination.less';
import 'rc-pagination/assets/index.less';

interface IPagination {
  style?: CSSProperties;
  pagination?: IPaginationProps;
  onChange?: (...rest: any) => void;
  autoPagination?: boolean;
}

export const Pagination = (props: IPagination) => {
  const { style, pagination = {}, onChange } = props;

  const handleChange = (current: number, pageSize: number) => {
    onChange && onChange(current, pageSize);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', ...style }}>
      <RcPagination
        prefixCls="demon-pagination"
        // total={450}
        // showSizeChanger
        // showQuickJumper
        {...pagination}
        onChange={handleChange}
      />
    </div>
  );
};
