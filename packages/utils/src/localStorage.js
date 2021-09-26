/**
 * 封装 localStorage 方法
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
export function setLocal(key, value) {
  if (typeof key !== 'string') return;
  localStorage.setItem(encode(key), encode(JSON.stringify(value)));
}

// 获取 session
export function getLocal(key) {
  if (typeof key !== 'string') return;
  const value = localStorage.getItem(encode(key));

  if (isNil(value)) return;

  return JSON.parse(decode(value));
}

// 删除 session
export function removeLocal(key) {
  if (typeof key !== 'string') return;
  localStorage.removeItem(key);
}

// 清空 session
export function clearLocal() {
  localStorage.clear();
}
