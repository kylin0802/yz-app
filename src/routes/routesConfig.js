import { asyncImport } from './routerLoadable';
import '../styles/iconfont/iconfont.css';

const routesConfig = [
  // {
  //   name: '选房',
  //   path: '/app',
  //   key: 'app',
  //   component: asyncImport(() => import('../containers/CheckHome')),
  //   meta: {
  //     title: '选房'
  //   },
  //   icon: 'anticon-kaoshi'
  // },
  {
    name: '首页',
    path: '/app',
    key: 'app',
    component: asyncImport(() => import('../containers/Home')),
    meta: {
      title: '首页'
    },
    icon: 'anticon-kaoshi'
  },
  {
    name: '设备配置',
    path: '/device',
    key: 'device',
    component: asyncImport(() => import('../containers/Device')),
    meta: {
      title: '设备管理'
    },
    icon: 'anticon-xitongshezhi'
  },
  {
    name: '我的',
    path: '/user',
    key: 'user',
    component: asyncImport(() => import('../containers/User')),
    meta: {
      title: '我的'
    },
    icon: 'anticon-kaoshengguanli'
  }
];

export default routesConfig;
