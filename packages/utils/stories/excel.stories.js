import React from 'react';
import { Button } from '@elonwu/web';
import { exportExcel } from '../src';

export default {
  title: 'Utils/exportExcel',
};

export const ExportExcelStory = () => {
  const onDownloadSingle = () => {
    exportExcel({
      title: '单张 Sheet 下载',
      columns: [
        { key: 'a', title: 'A', excel: true },
        { key: 'b', title: 'B', excel: true },
        { key: 'c', title: 'C', excel: true },
      ],
      dataSource: [
        { a: 'AAA', b: 'BBB', c: 'CCC' },
        { a: 'AAA', b: 'BBB', c: 'CCC' },
        { a: 'AAA', b: 'BBB', c: 'CCC' },
        { a: 'AAA', b: 'BBB', c: 'CCC' },
        { a: 'AAA', b: 'BBB', c: 'CCC' },
      ],
    });
  };
  const onDownloadMultiple = () => {
    exportExcel(
      [
        {
          title: '第一张 Sheet',
          columns: [
            { key: 'a', title: 'A', excel: true },
            { key: 'b', title: 'B', excel: true },
            { key: 'c', title: 'C', excel: true },
          ],
          dataSource: [
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
          ],
        },
        {
          title: '第二张 Sheet',
          columns: [
            { key: 'a', title: 'A', excel: true },
            { key: 'b', title: 'B', excel: true },
            { key: 'c', title: 'C', excel: true },
          ],
          dataSource: [
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
          ],
        },
        {
          title: '第三张 Sheet',
          columns: [
            { key: 'a', title: 'A', excel: true },
            { key: 'b', title: 'B', excel: true },
            { key: 'c', title: 'C', excel: true },
          ],
          dataSource: [
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
            { a: 'AAA', b: 'BBB', c: 'CCC' },
          ],
        },
      ],
      '多张 Sheets 下载',
    );
  };

  return (
    <div>
      <Button onClick={onDownloadSingle}>单张 Sheet</Button>
      <Button onClick={onDownloadMultiple}>多张 Sheets</Button>
    </div>
  );
};
