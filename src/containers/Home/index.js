import React from 'react';
import Carousel from './components/Carousel';
import { Flex, WhiteSpace, Icon } from 'antd-mobile';

import './index.less';
const PlaceHolder = (props) => {
    const {title, url} = props
    const handleLink = (url) => {
        console.log("傻逼")
        props.history.push(url)
    }
   return (
  <div className="home-page-tag-item">
    <span className="home-page-tag-item-icon" onClick={()=> handleLink(url)}>
    <Icon type="check" />
    </span>
    <span className="home-page-tag-item-title">{title}</span>
  </div>
)};
const Nav = (props) => {

    return (
  <div className="home-page-tag">
    <PlaceHolder title="手机开门" {...props} url="/user/addUser" />
    <PlaceHolder title="一键进小区" {...props} />
    <PlaceHolder title="信息注册" {...props}/>
    <PlaceHolder title="车辆信息" {...props}/>
    <PlaceHolder title="家庭成员" {...props}/>
    <PlaceHolder title="记录查询" {...props} />
  </div>
)};
function Home(props) {
  return (
    <React.Fragment>
      <div className="home-page-title">
        智慧家
      </div>
      <section className="home-page-carousel-wrapper">
        <Carousel />
      </section>
      <section className="home-page-tag-wrapper">
        <h5 className="home-page-tag-title">通行统计</h5>
        <Nav {...props}/>
      </section>
    <section className="home-page-news"><span><Icon type="exclamation-circle" /></span>名人苑智能家全面上线...</section>
    <section className="home-page-list">
      <h5 className="home-page-list-title">今日报警</h5>
      <div className="home-page-list-item-wrapper">

  
      <div className="home-page-list-item">
        <div className="home-page-list-item-title">报警时间</div>
        <div className="home-page-list-item-content">
          2020/03/23
        </div>
      </div>
      <div className="home-page-list-item">
      <div className="home-page-list-item-title">报警时间</div>
        <div className="home-page-list-item-content">
          2020/03/23
        </div>
      </div>
      </div>
    </section>
    </React.Fragment>
  );
}

export default Home;



