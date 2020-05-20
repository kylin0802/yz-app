import React from 'react';
// import { Icon,} from 'antd-mobile';
import ListItem from './components/ListItem/index';
import './index.less';
const AddFamily = () => {
  return (
    <section className="addFamily-page">
      <section className="addFamily-page-header">
        <section className="cardInfo-page-header-icon">{/* <Icon type="left" size="lg"/>  */}</section>
        账号绑定
      </section>
      <section className="addFamily-page-content">
        <section className="addFamily-page-content-text">绑定对方账号 添加家庭成员</section>
        <ListItem />
      </section>
    </section>
  );
};
export default AddFamily;
