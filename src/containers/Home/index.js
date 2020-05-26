import React, { useEffect, useState } from 'react';
import Carousel from './components/Carousel';
import { Icon, Modal, Toast } from 'antd-mobile';
import fetch from '@/services/axios';
import { get } from 'lodash';
import './index.less';
import { typeOf } from 'plupload';
import { getAppUrl } from '@/config/url.js';
const OPEN_URL = getAppUrl() + '/yzSmartGate/manage/communityAppServer/openDoor';
const PERINFO_URL = getAppUrl() + '/yzSmartGate/manage/communityAppServer/getPersonSelf';
const GATE_URL = getAppUrl() + '/yzSmartGate/manage/communityAppServer/getFaceGateList';

// window.updateValue = function(url) {
//   console.log(url);
//   if(window.callback !== undefined) {
//     console.log(1111)
//       window.callback.updateValue(url);
//   }
// };
const operation = Modal.operation;

const PlaceHolder = props => {
  const { title, url, icon, api } = props;
  const [initUsers, setInitUsers] = useState([]);
  const [Gate, setGate] = useState(''); //设备表
  const [data, setData] = useState('');

  const handleLink = url => {
    // if (!!api) {

    // } else {
    try {
      window.jsInterface.jump(url);
    } catch (err) {
      props.history.push(url);
    }

    // }
  };
  const opendoor = () => {
    //一键开门
    // console.log('----------');
    // let param = JSON.parse(sessionStorage.getItem('userInfo')).personId
    fetch
      .post(api, {
        deviceId: Gate[0].deviceId,
        personId: data.personId,
        personName: initUsers.name,
        houseId: initUsers.houseId,
        areaId: initUsers.areaId
      })
      .then(res => {
        if (get(res, 'state') === 10000) {
          Toast.success(res.message === 'OK' ? '成功' : '失败');
        }
        // console.log(res);
      });
  };
  const getdata = initUserer => {
    //获取本人信息
    // console.log('qqq',initUserer.personId)
    fetch.post(PERINFO_URL, { personId: initUserer.personId }).then(res => {
      // console.log('per',res.data)
      setInitUsers(res.data);
      getGateList(res.data.areaId);
    });
  };
  const getGateList = param => {
    //获取设备列表
    fetch.post(GATE_URL, { areaId: param }).then(res => {
      // console.log('aaaaaa',res)
      setGate(res.data);
    });
  };

  useEffect(() => {
    let initUserer = null;
    try {
      window.jsInterface.getUserInfo();
      console.log('123', window.jsInterface.getUserInfo());
      initUserer = JSON.parse(window.jsInterface.getUserInfo());
      console.log('安卓获取', initUserer);
    } catch (err) {
      initUserer = {
        password: 'password003',
        personId: 'Pa5ec091ab78e4c22a46a28eeea891851',
        userName: '1356669999',
        status: 'localhost'
      };
    }
    setData(initUserer);
    getdata(initUserer);
  }, []);

  return (
    <div className="home-page-tag-item">
      <span
        className="home-page-tag-item-icon"
        onClick={
          title === '手机开门'
            ? () =>
                operation(
                  Gate &&
                    Gate.map((item, index) => {
                      return { text: item.location, onPress: opendoor };
                      // { text: '二号门', onPress: () => console.log('置顶聊天被点击了') },
                    })
                )
            : e => handleLink(url)
        }>
        {/* <Icon type="check" /> */}
        <span className={icon}></span>
      </span>
      <span className="home-page-tag-item-title">{title}</span>
    </div>
  );
};
const Nav = props => {
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    let initUser = null;
    try {
      setUserInfo('我调取1' + window.jsInterface.getUserInfo()); // 获取初始化数据
      initUser = window.jsInterface.getUserInfo();
      console.log('安卓获取', initUser);
    } catch (err) {
      const data = {
        password: 'password003',
        personId: 'Pa5ec091ab78e4c22a46a28eeea891851',
        userName: '1356669999',
        status: 'localhost'
      };
      initUser = JSON.stringify(data);
      console.log('本地', initUser);
    }
    sessionStorage.setItem('userInfo', initUser);
  }, []);

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
