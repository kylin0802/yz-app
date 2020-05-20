import React from 'react';
// import { Icon,WingBlank} from 'antd-mobile';
import ListItem from './components/List/index';
import './index.less';

const CarInfo = () => {
  return (
    <section className="cardInfo-page">
      {/* <section className="cardInfo-page-header">
        <section className="cardInfo-page-header-icon"></section>
        车辆添加
      </section> */}
      <section className="cardInfo-page-content">
        <section className="cardInfo-page-content-text">完善基本信息</section>
        {/* <WingBlank>           */}
        <ListItem />
        {/* </WingBlank> */}
      </section>
    </section>
  );
};
export default CarInfo;
