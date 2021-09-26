import { useMemo } from 'react';
import useSWR from 'swr';
import { queryParams, isFunction, notNil } from '@elonwu/utils';

export const useApi = (fetcher, params, options) => {
  const shouldFetch = useMemo(() => {
    if (notNil(options) && 'shouldFetch' in options) {
      return options.shouldFetch;
    }

    return true;
  }, [options]);

  // key 为 null 时， 不会发出请求
  const key = useMemo(() => {
    try {
      let key = null;

      if (shouldFetch && isFunction(fetcher)) {
        key = `${fetcher.name}${queryParams(params)}`;
      }

      return key;
    } catch (err) {
      console.log({ useApiError: err });
    }
  }, [shouldFetch, fetcher, params]);

  const { data, mutate, error, isValidating } = useSWR(
    key,
    // fetcher
    () => fetcher(params),
    // 配置
    Object.assign(
      {
        dedupingInterval: 100,
        revalidateOnReconnect: true, // 断网重连后自动请求
        revalidateOnMount: true, // 所在组件挂载时自动更新， 如果不设置， 却传了 initialData 会自动设置为 false
        revalidateOnFocus: false, // 聚焦时自动请求
        shouldRetryOnError: false, // 请求失败后自动再次请求
      },
      options,
    ),
  );

  return {
    data,
    error,
    mutate,
    loading: key && !error && isValidating,
  };
};
