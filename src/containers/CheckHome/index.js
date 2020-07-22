import React, { useEffect, useState } from 'react';
import { WingBlank, List, Toast } from 'antd-mobile';
import { getAppUrl } from '@/config/url.js';
import fetch from '@/services/axios';
import './index.less';
const LOGIN_URL = getAppUrl() + '/yzSmartGate/app/login';
const PERSON_HOME = getAppUrl() + '/yzSmartGate/app/getPersonListByAccount';

const Item = List.Item;
const Brief = Item.Brief;

const CheckHome = props => {
  const [PersonHome, setPersonHome] = useState([]);

  const handleLink = item => {
    try {
      window.jsInterface.toApp();
      console.log('456', item);
      // console.log('456', window.jsInterface.toApp('/Home'))
      localStorage.setItem('personID', item.personId);
      localStorage.setItem('houseId', item.houseId);
      localStorage.setItem('name', item.name);
      localStorage.setItem('areaId', item.areaId);
      localStorage.setItem('address', item.address);
    } catch (err) {
      window.jsInterface.toApp();
      // props.history.push('/Home');
      // console.log('789', window.jsInterface.toApp('/Home'))
      console.log('123', item);
      localStorage.setItem('personID', item.personId);
      localStorage.setItem('houseId', item.houseId);
      localStorage.setItem('name', item.name);
      localStorage.setItem('areaId', item.areaId);
      localStorage.setItem('address', item.address);
    }
  };
  //   useEffect(()=>{
  //       fetch.post(LOGIN_URL, { userName: "16", password: "111111" }).then(res => {
  //   console.log('res', res)
  // })
  //   })

  const getPersonHouse = initUserer => {
    console.log('resss', initUserer.userId);
    fetch.post(PERSON_HOME, { userId: initUserer.userId }).then(res => {
      console.log('res', res.data);
      setPersonHome(res.data);
      if (res.data && res.data.length === 1) {
        window.jsInterface.toApp();
        // console.log('123',item)
        localStorage.setItem('personID', res.data[0].personId);
        localStorage.setItem('houseId', res.data[0].houseId);
        localStorage.setItem('name', res.data[0].name);
        localStorage.setItem('areaId', res.data[0].areaId);
        localStorage.setItem('address', res.data[0].address);
      }
    });
  };

  useEffect(() => {
    document.title = '更换住所';
    // console.log('nihao',document.cookie)
    let initUserer = null;
    try {
      window.jsInterface.getUserInfo();
      console.log('123', window.jsInterface.getUserInfo());
      initUserer = JSON.parse(window.jsInterface.getUserInfo());
      console.log('安卓获取', initUserer);
    } catch (err) {
      console.log(err);
      // initUserer = {
      //   // password: 'password003',
      //   userId: 'P836cba6e98cd42d183411f196308bec8',
      //   // userName: '1356669999',
      //   // status: 'localhost'
      // };
    }
    // Toast.success('暂未获取到房源信息，请先选择住房');
    getPersonHouse(initUserer);
  }, []);

  return (
    <div>
      <WingBlank>
        <div className="checkText">请选择住所</div>
        <div className="nowHouse">当前住所：{localStorage.getItem('address') || '暂未选择'}</div>
        {/* <List renderHeader={() => '请选择住所'} className="my-list" > */}
        {PersonHome &&
          PersonHome.map((item, index) => {
            return (
              <div
                key={item.personId}
                className="checkHome"
                onClick={() => {
                  handleLink(item);
                }}>
                <div className="checkIndex">住所{index + 1}</div>
                <div>{item.address}</div>
              </div>
            );
          })}
        {/* </List> */}
      </WingBlank>
    </div>
  );
};
export default CheckHome;
