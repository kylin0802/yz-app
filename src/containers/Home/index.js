import React, { useEffect, useState } from 'react';
import Carousel from './components/Carousel';
import { Modal, Toast } from 'antd-mobile';
import fetch from '@/services/axios';
import { get } from 'lodash';
import './index.less';
import { getAppUrl } from '@/config/url.js';
const OPEN_URL = getAppUrl() + '/yzSmartGate/app/openDoor';
const PERINFO_URL = getAppUrl() + '/yzSmartGate/app/getPersonSelf';
const GATE_URL = getAppUrl() + '/yzSmartGate/app/getFaceGateList';
// const LOGIN_URL = getAppUrl() + '/yzSmartGate/app/login';

const operation = Modal.operation;

const PlaceHolder = props => {
  const { title, url, icon, api, Gate } = props;
  const handleLink = url => {
    const apptitle = title;
    // console.log('apptitle', apptitle);
    localStorage.setItem('apptitle', apptitle);
    // if (apptitle) {
    //   document.title = apptitle;
    // } else {
    //   document.title = '智慧家';
    // }

    try {
      window.jsInterface.jump(url);
    } catch (err) {
      props.history.push(url);
    }
  };
  const opendoor = () => {
    //一键开门
    // console.log('----------');
    // let param = JSON.parse(sessionStorage.getItem('userInfo')).personId
    fetch
      .post(api, {
        deviceId: Gate[0].deviceId,
        personId: localStorage.getItem('personID'),
        // personId: datar.personId,
        // personName: initUsers.name,
        // houseId: initUsers.houseId,
        // areaId: initUsers.areaId
        personName: localStorage.getItem('houseId'),
        houseId: localStorage.getItem('name'),
        areaId: localStorage.getItem('areaId')
      })
      .then(res => {
        console.log('123', res);
        if (get(res, 'state') === 10000) {
          Toast.success(res.message === 'OK' ? '成功' : '失败');
        }
        // console.log(res);
      });
  };
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
  const { Gate } = props;
  return (
    <div className="home-page-tag">
      <PlaceHolder title="手机开门" {...props} icon="icon-door" api={OPEN_URL} Gate={Gate} />
      <PlaceHolder title="绑定成员" {...props} icon="icon-open" url="/user/Binding" />
      <PlaceHolder title="信息注册" {...props} icon="icon-loginout" url="/user/addUser" />
      <PlaceHolder title="车辆信息" {...props} url="/user/CarInfo" icon="icon-car" />
      <PlaceHolder title="添加成员" {...props} url="/user/AddFamily" icon="icon-user" />
      <PlaceHolder title="记录查询" {...props} url="/user/record" icon="icon-search" />
      <PlaceHolder title="更换住所" {...props} url="/user/CheckHome" icon="icon-search" />
      <hr />
      {/* 测试 ------- {userInfo} */}
    </div>
  );
};
function Home(props) {
  const [initUsers, setInitUsers] = useState([]);
  const [Gate, setGate] = useState([]); //设备表
  // const [datar, setData] = useState([]);
  const getdata = initUserer => {
    //获取本人信息
    // console.log('qqq',initUserer.personId)
    // fetch.post(PERINFO_URL, { personId: initUserer.personId }).then(res => {
    fetch.post(PERINFO_URL, { personId: initUserer }).then(res => {
      // console.log('per',res.data)
      if (get(res, 'state') === 10000) {
        setInitUsers(res.data || {});
        sessionStorage.setItem('type', res.data.personType);
        getGateList(res.data.areaId || {});
      }
    });
  };
  const getGateList = param => {
    //获取设备列表
    fetch.post(GATE_URL, { areaId: param }).then(res => {
      // console.log('aaaaaa',res)
      if (get(res, 'state') === 10000) {
        setGate(res.data || {});
      }
    });
  };
  const ApptoLink = () => {
    window.jsInterface.jump('/user/CheckHome');
    // props.history.push('/user/CheckHome')
  };
  useEffect(() => {
    console.log('------------------', localStorage.getItem('personID'));
    const per = localStorage.getItem('personID');
    // setData(per)
    if (per === null) {
      // Toast.success('暂未获取到房源信息，请先选择住房');
      ApptoLink();
    }
    getdata(per);
  }, []);

  return (
    <React.Fragment>
      <div className="home-page-title">智慧家</div>
      <section className="home-page-carousel-wrapper">
        <Carousel />
      </section>
      <section className="home-page-tag-wrapper">
        <h5 className="home-page-tag-title">通行统计</h5>
        <Nav {...props} Gate={Gate} />
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
