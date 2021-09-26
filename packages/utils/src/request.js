import { default as axios } from 'axios';

import { queryParams } from './format';
import { isFunction, EmptyFunc } from './type';

export class Request {
  // 不需要设置头部的接口； 默认返回一个空对象
  constructor(baseURL, handelers, options) {
    this.AXIOS_INSTANCE = axios.create(
      Object.assign(
        // 默认配置
        {
          baseURL,
          timeout: 60000, // 默认一分钟超时
          withCredentials: true, // withCredentials 未配置时，默认为 true
        },
        // 自定义配置
        options,
      ),
    );

    this.customizeHeader = handelers?.customizeHeader; // 针对某一后台的通用「 header 」处理
    this.handleResolve = handelers?.onSuccess || EmptyFunc; // 针对某一后台的通用「 数据结构 」处理
    this.handleError = handelers?.onError || EmptyFunc; // 针对某一后台的通用「 错误信息 」处理

    this.request = this.request.bind(this);
    this.requestByQuery = this.requestByQuery.bind(this);
    this.requestByBody = this.requestByBody.bind(this);
  }

  async request(options) {
    if (
      options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH' ||
      options.method === 'DELETE'
    ) {
      // FormData
      if (options.data instanceof FormData) {
        options.headers = Object.assign({}, options.headers, {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; chartset=UTF-8',
        });
      }
      // application/json
      else {
        options.headers = Object.assign({}, options.headers, {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        });
        options.data = JSON.stringify(options.data);
      }
    }

    // 接口的固定 header
    if (isFunction(this.customizeHeader)) {
      const customizeHeaders = await this.customizeHeader();
      options.headers = Object.assign({}, customizeHeaders, options.headers);
    }

    try {
      const response = await this.AXIOS_INSTANCE.request(options);
      return this.handleResolve(response.data);
    } catch (err) {
      return this.handleError(err);
    }
  }

  // 通过路径携带信息
  requestByQuery({ url, params = {}, headers }, method = 'GET') {
    return this.request({
      url: `${url}${queryParams(params)}`,
      method,
      headers,
    });
  }

  // 通过 body 携带信息
  requestByBody({ url, params = {}, headers }, method = 'POST') {
    return this.request({
      ...rest,
      url: `${url}`,
      method,
      headers,
      data: params,
    });
  }

  get(url, params, headers) {
    return this.requestByQuery({ url, params, headers }, 'GET');
  }

  // delete 为保留字
  destroy(url, params, headers) {
    return this.requestByBody({ url, params, headers }, 'DELETE');
  }

  patch(url, params, headers) {
    return this.requestByBody({ url, params, headers }, 'PATCH');
  }

  post(url, params, headers) {
    return this.requestByBody({ url, params, headers }, 'POST');
  }

  put(url, params, headers) {
    return this.requestByBody({ url, params, headers }, 'PUT');
  }

  // 当后端直接返回二进制文件时，触发下载
  download(url, params, type, filename, onDownloadProgress) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.requestByQuery({
          url,
          params: params || {},
          headers: {
            'Content-Type': 'application/json; application/octet-stream',
          },
          responseType: 'arraybuffer',
          onDownloadProgress, // {e : {loaded, total}}
        });
        downloadFile(response, type, filename);
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  // 上传
  upload(url, params, onUploadProgress, setCancelTokenSource) {
    return new Promise(async (resolve, reject) => {
      let options = {};

      // TODO 取消
      // if (setCancelTokenSource) {
      //   const cancelTokenSource = axios.CancelToken.source();
      //   options.cancelToken = cancelTokenSource.token;

      //   setCancelTokenSource(cancelTokenSource);
      // }

      try {
        const response = await this.requestByBody({
          url,
          params,
          headers: { 'Content-Type': 'multipart/form-data; chartset=UTF-8' },
          onUploadProgress, // {e : {loaded, total}}
          ...options,
        });
        resolve(response);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}

// 触发浏览器下载
export const downloadFile = (data, type, filename) => {
  try {
    const blob = new Blob([data], {
      encoding: 'UTF-8',
      type, // 指定数据转换文件类型
      // 比如 下载 exel
      // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      link.click();
      window.URL.revokeObjectURL(link.href);
    }
  } catch (err) {
    console.log({ err });
  }
};
