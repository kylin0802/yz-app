import axios from './axios';

/* login */
export const login = function(payload) {
  return axios.post('/yzSmartGate/login', payload);
};

/* logout */
export const logout = function() {
  return axios.post('/yzSmartGate/logout');
};

/* userInfo */
// export const userInfo = function (payload) {
//   return axios.get('/api/userInfo', {
//     params: payload
//   })
// }
