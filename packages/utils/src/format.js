import { stringify } from 'qs';

/**
 * @description 四舍五入， 并保留指定有效位数
 * @param {number} 处理的数字
 * @param {number} digit 保留小数位数
 */
export function formatRound(num, digit = 2) {
  return Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit);
}

/**
 * @description 随机范围数字
 */
export function randomNumber(min = 0, max = 100) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 *  @description 字符串数字 / 数字 加上千分符
 */

export function addCommas(nStr) {
  let [integerPart, decimalPart] = nStr.toString().split('.');
  const reg = /(\d+)(\d{3})/;
  while (reg.test(integerPart)) {
    integerPart = integerPart.replace(reg, '$1' + ',' + '$2');
  }
  return `${integerPart}${decimalPart === undefined ? '' : '.' + decimalPart}`;
}

/**
 *  @description 对象转 url query
 */
export function queryParams(params) {
  try {
    return Object.keys(params).length > 0 ? `?${stringify(params)}` : ``;
  } catch (err) {
    return ``;
  }
}

// 上传文件的预览地址
export const readPreviewUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
