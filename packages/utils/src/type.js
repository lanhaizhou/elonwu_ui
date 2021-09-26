export const EmptyString = '';
export const EmptyArray = [];
export const EmptyObject = {};
export const EmptyFunc = () => null;

// 字符串
export function isString(value) {
  return typeof value === 'string';
}

// 非空字符串
export function isValidString(value) {
  return typeof value === 'string' && value !== '';
}

// 数组类型
export function isArray(value) {
  return Array.isArray(value);
}

// 非空数组
export function isValidArray(value) {
  return Array.isArray(value) && value.length > 0;
}

// 是 undefined 或者 null
export function isNil(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'number' && isNaN(value))
  );
}

// 不是 undefined 或者 null
export function notNil(value) {
  return !isNil(value);
}

// 函数
export function isFunction(value) {
  return typeof value === 'function';
}

// 转换为可执行函数
export function validFunction(value) {
  return isFunction(value) ? value : EmptyFunc;
}

// 容错的 JSON parse
export function parseJSON(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
