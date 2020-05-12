import React from 'react';
import Routes from './routes';
import './App.less';
import Menus from './components/Menus';
// import { Layout, Drawer } from 'antd-mobile';


const DrawerStatus = 765;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
      drawerVisible: false,
      placement: 'left'
    };
  }


  handleMenuClick(status) {
    const { screenOffsetWidth } = this.props;
    const { collapsed, drawerVisible } = this.state;

    // 抽屉组件显示
    if (screenOffsetWidth < DrawerStatus) {
      this.setState({
        collapsed: false,
        drawerVisible: !drawerVisible
      });
    } else {
      this.setState({
        collapsed: !collapsed,
        drawerVisible: false
      });
    }
  }

  // 点击抽屉遮罩关闭
  handleDrawerClose() {
    this.setState({
      drawerVisible: false
    });
  }

  render() {
    // const { screenOffsetWidth, history } = this.props;
    // let userInfo = new Function(`return ${localStorage.getItem('userInfo')}`)() || {};
    return (
      <>
           
            <Routes {...this.props}/>
            <Menus {...this.props} />
            </>
     
    );
  }
}

export default App;
