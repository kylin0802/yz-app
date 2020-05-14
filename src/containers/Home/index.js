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
    <PlaceHolder title="一键小区" {...props} />
    <PlaceHolder title="信息注册" {...props}/>
    <PlaceHolder title="信息注册" {...props}/>
    <PlaceHolder title="信息注册" {...props}/>
    <PlaceHolder title="信息注册" {...props} />
  </div>
)};
function Home(props) {
  return (
    <React.Fragment>
      <section className="home-page-carousel-wrapper">
        <Carousel />
      </section>
      <section className="home-page-tag-wrapper">
        <h5>数据</h5>
        <Nav {...props}/>
      </section>
    </React.Fragment>
  );
}

export default Home;



