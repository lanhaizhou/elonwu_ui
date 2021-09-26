/**
 * 封装 sessionStorage 方法
 */

import { isNil } from './type';

// 是否需要加密
// const USE_ENCODE = true;
const USE_ENCODE = false;

// 加密方法
function encode(data) {
  return USE_ENCODE ? btoa(encodeURIComponent(data)) : data;
}
// 解密方法
function decode(data) {
  return USE_ENCODE ? decodeURIComponent(atob(data)) : data;
}
// 存储 session
export function setSession(key, value) {
  if (typeof key !== 'string') return;
  sessionStorage.setItem(encode(key), encode(JSON.stringify(value)));
}

// 获取 session
export function getSession(key) {
  if (typeof key !== 'string') return;
  const value = sessionStorage.getItem(encode(key));

  if (isNil(value)) return;

  return JSON.parse(decode(value));
}

// 删除 session
export function removeSession(key) {
  if (typeof key !== 'string') return;
  sessionStorage.removeItem(key);
}

// 清空 session
export function clearSession() {
  sessionStorage.clear();
}
