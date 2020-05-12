import axios from 'axios';
import { get } from 'lodash';
import LoadingBar from '@/components/LoadingBar';
import { HashRouter } from 'react-router-dom'
// let apiBaseURL = 'https://www.easy-mock.com/mock/5d088415bdc26d23199ba01a'


const instance = axios.create({
  //baseURL: apiBaseURL,
  timeout: 5000
});


  function isIE11(){
	if((/Trident\/7\./).test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}
function isIE() {
	if (!!window.ActiveXobject || "ActiveXObject" in window) {
		return true;
	} else {
		return false;
	}
}

instance.interceptors.request.use(
  config => {
    // let userInfo = window.localStorage.getItem('userInfo') || '{}';
    // let userTokenState = get(JSON.parse(userInfo), 'userTokenState.access_token');
    // if (!!userTokenState) {
    //   config.headers = {
    //     //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //     Authorization: `Bearer${userTokenState}`
    //   };
    // }
    config.headers['yz-x-requested-with'] = 'yzAjaxHttpRequest'

     if(!isIE() && !isIE11() ) { LoadingBar.start();}
  
   
    
    return config;
  },
  err => {
    if(!isIE() && !isIE11() ) {LoadingBar.error();}
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  response => {
    // console.log(response)
    if(!isIE() && !isIE11() ) {LoadingBar.finish();}
    if(get(response, 'data.status') === 1001) {
      // console.log('status', get(response, 'data.status'))
      sessionStorage.removeItem('userName')
      const router = new HashRouter()
      router.history.push('/login')
    }
    return response.data;
  },
  err => {
    if(!isIE() && !isIE11() ) {LoadingBar.error();}
    return Promise.reject(err);
  }
);

export default instance;
