import fetch from '@/services/axios';

export const getPrefix = () => {
  return new Function('return ' + localStorage.getItem('prefixPhoto'))();
};

export const getAppUrl = () => {
  //
  // 由于 通用地址连的是本地安卓， 请求服务器地址调取
  try {
    console.log(window.jsInterface.baseUrl());
    return window.jsInterface.baseUrl();
    // return '';
  } catch (err) {
    console.log(err);
    return '';
  }
};
