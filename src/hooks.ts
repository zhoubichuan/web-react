// 定时器
import React, { useEffect, useState, useRef } from 'react';
export function useSetTimeout(callback: Function, delay: Number) {
  if (!(callback instanceof Function)) {
    throw new Error('callback 参数必须是函数！');
  }
  if (!(delay === null || typeof delay === 'number')) {
    throw new Error('delay 必须是 null 或者数字！');
  }
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    let id: any = null;
    const tick = () => {
      const returnValue = savedCallback.current();
      if (returnValue) {
        console.log('come in');
        if (returnValue instanceof Function) {
          returnValue();
        } else {
          throw new Error('返回值必须是函数！');
        }
        clearTimeout(id);
        return;
      }
      id = setTimeout(tick, delay);
    };
    id = setTimeout(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
export function useSetInterval(callback: Function, delay: Number) {
  if (!(callback instanceof Function)) {
    throw new Error('callback 参数必须是函数！');
  }
  if (!(delay === null || typeof delay === 'number')) {
    throw new Error('delay 必须是 null 或者数字！');
  }
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay) {
      return;
    }
    let id: any = null;
    const tick = () => {
      const returnValue = savedCallback.current();
      if (returnValue) {
        console.log('come in');
        if (returnValue instanceof Function) {
          returnValue();
        } else {
          throw new Error('返回值必须是函数！');
        }
        clearInterval(id);
        return;
      }
    };
    id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export const useRequest = (request: any, params?: any) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    request(params)
      .then((res: any) => {
        setLoading(false);
        setData(res);
      })
      .catch((err: any) => {
        setLoading(false);
      });
  }, [params]);
  return [data, loading];
};
