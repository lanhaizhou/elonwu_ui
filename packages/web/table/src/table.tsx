import React, { ReactNode, useEffect, useState } from 'react';
import RcTable from 'rc-table';
import { RenderedCell } from 'rc-table/lib/interface';
import { Pagination } from './pagination';
import './index.less';

export interface IPaginationProps {
  total?: number;
  current?: number;
  pageSize?: number;
}

export interface ITableProps {
  columns: Array<object>;
  dataSource: Array<object>;
  pagination?: IPaginationProps;
  onChange?: (...rest: any) => void;
  autoPagination?: boolean;
}

interface IColumnProps {
  align?: string;
  className?: string;
  colSpan?: number;
  dataIndex?: string | string[];
  ellipsis?: boolean | { showTitle?: boolean };
  fixed?: boolean | string;
  key?: string | number;
  render?: (
    value: any,
    record: object,
    index: number,
  ) => ReactNode | RenderedCell<object>;
  title?: ReactNode;
  width?: string | number;
  onCell?: (record: any, rowIndex: any) => void;
  onHeaderCell?: (column: any) => void;
  type?: string;
}

const maxLength = 20;

const reRender = {
  link: (value: any) => <div className="demo-link">{value}</div>,
  tag: (value: any) => {
    const vArr = value.split(',');
    return (
      <div style={{ display: 'flex' }}>
        {vArr.map((i: any, index: number) => (
          <div className="demon-table-type-tag" key={index}>
            {i}
          </div>
        ))}
      </div>
    );
  },
  default: (value: any) =>
    String(value).length > maxLength ? (
      <div>{value.slice(0, maxLength)}...</div>
    ) : (
      <div>{value}</div>
    ),
};

export const Table = (props: ITableProps) => {
  const {
    columns,
    dataSource,
    pagination = {},
    onChange,
    autoPagination,
  } = props;
  const [paging, setPaging] = useState(pagination);
  const [data, setData] = useState<Array<object>>([]);

  if (!pagination?.total) {
    pagination.total = dataSource?.length || 0;
  }

  const formatColumns: any = () => {
    const newColumns = columns.map((column: IColumnProps) => {
      const { key, title, render, type, ...rest } = column;

      return {
        key,
        dataIndex: key,
        title,
        render: (value: any, record: object, index: number) => {
          const renderCustom =
            (type && reRender[type]) || render || reRender.default;
          return <div>{renderCustom(value, record, index)}</div>;
        },
        ...rest,
      };
    });

    return newColumns;
  };

  const initDataSource = (paging: IPaginationProps) => {
    const { current = 1, pageSize = 10 } = paging;
    const start = current > 1 ? pageSize * current - pageSize : 0;
    const end = pageSize * current;
    const newData = dataSource.slice(start, end);
    setData(newData);
  };

  const handleChange = (current: number, pageSize: number) => {
    if (autoPagination) initDataSource({ current, pageSize });
    onChange && onChange(current, pageSize);
  };

  useEffect(() => {
    autoPagination &&
      initDataSource({ current: 1, pageSize: 10, ...pagination });
  }, []);

  return (
    <div>
      <RcTable
        columns={formatColumns()}
        data={autoPagination ? data : dataSource}
        prefixCls={'demon'}
        className="demon-table"
      />
      <Pagination
        style={{ marginTop: 20 }}
        pagination={pagination}
        onChange={handleChange}
        autoPagination={autoPagination}
      />
    </div>
  );
};
