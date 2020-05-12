import fetch from '@/services/axios';

export const getPrefix = () => {
  return new Function('return ' + localStorage.getItem('prefixPhoto'))();
};
