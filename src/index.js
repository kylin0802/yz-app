import './polyfill';
// IE polyfill
import 'core-js';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd-mobile';
import { ContextProvider } from './useReducer' // 用原生useReducer 进行全局状态管理
import Page from './Page';
import store from './redux';
// import zh_CN from 'antd-mobile/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './reset.less';

ReactDOM.render(
  <Provider store={store}>
    <ContextProvider>
      <LocaleProvider>
        <Page />
      </LocaleProvider>
    </ContextProvider>
  </Provider>,
  document.getElementById('app')
);