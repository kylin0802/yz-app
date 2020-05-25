import React, {useEffect, useState} from 'react';
import Carousel from './components/Carousel';
import { Icon } from 'antd-mobile';
import fetch from '@/services/axios';
import './index.less';
const OPEN_URL = '/yzSmartGate/communityAppServer/openDoor';


// window.updateValue = function(url) {
//   console.log(url);
//   if(window.callback !== undefined) {
//     console.log(1111)
//       window.callback.updateValue(url);
//   }
// };


const PlaceHolder = props => {
  const { title, url, icon, api } = props;

  const handleLink = url => {
    if (!!api) {
      fetch.post(api, {
        deviceId: '18937fc30067',
        personId: '3123123',
        personName: 'personName001',
        houseId: 'H101101',
        areaId: '004'
      }).then(res => {
        console.log(res);
      });
    } else {
      try {
        window.jsInterface.jump(url);
      } catch (err) {
        props.history.push(url)
       
      }
     
    }
  };
  return (
    <div className="home-page-tag-item">
      <span className="home-page-tag-item-icon" onClick={e => handleLink(url)}>
        {/* <Icon type="check" /> */}
        <span className={icon}></span>
      </span>
      <span className="home-page-tag-item-title">{title}</span>
    </div>
  );
};
const Nav = props => {

  const [ userInfo, setUserInfo] =useState('')
 
  useEffect(() => {
    try{
      setUserInfo('我调取1' + window.jsInterface.getUserInfo())
      window.updateValue= updateValue
    }catch (err) {
      window.updateValue= updateValue
    }
  }, []);

 const updateValue =(res) =>{
   alert(33333)
  console.log(res)
}

  return (
    <div className="home-page-tag">
      <PlaceHolder title="手机开门" {...props} icon="icon-door" api={OPEN_URL} />
      <PlaceHolder title="一键进小区" {...props} icon="icon-open" />
      <PlaceHolder title="信息注册" {...props} icon="icon-loginout" url="/user/addUser" />
      <PlaceHolder title="车辆信息" {...props} url="/user/CarInfo" icon="icon-car" />
      <PlaceHolder title="添加成员" {...props} url="/user/AddFamily" icon="icon-user" />
      <PlaceHolder title="记录查询" {...props} url="/user/record" icon="icon-search" />
      <hr />
      {/* 测试 ------- {userInfo} */}
    </div>
  );
};
function Home(props) {
  return (
    <React.Fragment>
      <div className="home-page-title">智慧家</div>
      <section className="home-page-carousel-wrapper">
        <Carousel />
      </section>
      <section className="home-page-tag-wrapper">
        <h5 className="home-page-tag-title">通行统计</h5>
        <Nav {...props} />
      </section>
      <section className="home-page-news">
        <span className="icon-voice"></span>名人苑智能家全面上线...
      </section>
      <section className="home-page-list">
        <h5 className="home-page-list-title">今日报警</h5>
        <div className="home-page-list-item-wrapper">
          <div className="home-page-list-item">
            <div className="home-page-list-item-title">报警时间</div>
            <div className="home-page-list-item-content">2020/03/23</div>
          </div>
          <div className="home-page-list-item">
            <div className="home-page-list-item-title">报警时间</div>
            <div className="home-page-list-item-content">2020/03/23</div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Home;
