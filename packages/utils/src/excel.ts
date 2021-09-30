import ExcelJS, { Workbook } from 'exceljs';
import moment from 'moment';

import { isFunction, isValidArray } from './type';
import { download } from './file';

export interface Column {
  title: string;
  key: string;
  excel: boolean | undefined | Function;
}

export interface Sheet {
  title: string;
  columns: Column[];
  dataSource: any[];
}

const prefix = `Row_`;

const downloadSpeadSheet = (buffer: BlobPart, filename?: string) => {
  const spreadsheetType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const now = moment().format('YYYY-MM-DD_HH:mm:ss');

  // 触发浏览器下载

  download(buffer, spreadsheetType, `${filename || '数据导出'}_${now}.xlsx`);
};

// 添加 sheet
const insertSheet = (
  workbook: Workbook,
  { title, columns: orginColumn, dataSource }: Sheet,
) => {
  const sheet = workbook.addWorksheet(title);

  // 避免出现非常规的 key, 比如 0
  const columns = (!isValidArray(orginColumn)
    ? []
    : orginColumn
  ).map((col: Column) =>
    Object.assign({}, col, { key: `${prefix}${col.key}`, header: col.title }),
  );

  //  添加表头
  sheet.columns = columns;

  // 添加数据行
  const rows = (!isValidArray(dataSource) ? [] : dataSource).map((record) =>
    formatRow(record, columns),
  );
  sheet.addRows(rows);
};

// 格式化每行数据
const formatRow = (record: any, columns: Column[]) => {
  let row = {};

  for (let { key, excel } of columns) {
    if (!excel) continue;

    if (isFunction(excel)) {
      // @ts-ignore
      row[key] = excel(record); // excel 为函数：根据数据格式化
    } else {
      row[key] = record[key.slice(prefix.length)]; // excel 为 true：获取当前 key 对应的值， 直接输出
    }
  }
  return row;
};

export const exportExcel = async (sheet: Sheet) => {
  const workbook = new ExcelJS.Workbook();
  insertSheet(workbook, sheet);
  // 转为 buffer
  const buffer = await workbook.xlsx.writeBuffer();
  // 触发浏览器下载
  downloadSpeadSheet(buffer, sheet?.title);
};

export const exportMultipleExcel = async (sheets: Sheet[], title: string) => {
  const workbook = new ExcelJS.Workbook();
  sheets.forEach((sheet) => insertSheet(workbook, sheet));
  // 转为 buffer
  const buffer = await workbook.xlsx.writeBuffer();
  // 触发浏览器下载
  downloadSpeadSheet(buffer, title);
};
