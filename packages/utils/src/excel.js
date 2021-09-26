import ExcelJS from 'exceljs';
import moment from 'moment';

import { isFunction, isArray, isValidArray } from './type';
import { downloadFile } from './request';

const prefix = `Row_`;

export const exportExcel = async (sheets, title) => {
  const workbook = new ExcelJS.Workbook();

  let exportTitle = title;

  // 包含多张 sheets
  if (isArray(sheets)) {
    sheets.forEach((sheet) => insertSheet(workbook, sheet));
  }
  // 单张 sheet
  else {
    exportTitle = sheets?.title;
    insertSheet(workbook, sheets);
  }

  // 转为 buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // 触发浏览器下载
  downloadFile(
    buffer,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    `${exportTitle || '数据导出'}_${moment().format(
      'YYYY-MM-DD_HH:mm:ss',
    )}.xlsx`,
  );
};

// 添加 sheet
const insertSheet = (workbook, { title, columns: orginColumn, dataSource }) => {
  const sheet = workbook.addWorksheet(title);

  // 避免出现非常规的 key, 比如 0
  const columns = (!isValidArray(orginColumn) ? [] : orginColumn).map((col) =>
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
const formatRow = (record, columns) => {
  let row = {};

  for (let { key, excel } of columns) {
    if (!excel) continue;

    row[key] = isFunction(excel)
      ? excel(record) // excel 为函数：根据数据格式化
      : record[key.slice(prefix.length)]; // excel 为 true：获取当前 key 对应的值， 直接输出
  }
  return row;
};
