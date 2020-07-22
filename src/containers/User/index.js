import React, { useState, useEffect } from 'react';
import { List, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import './index.less';
// import { GET_PERSON_INFO, PHOTO_API } from './api/index';
import fetch from '@/services/axios';
import { getAppUrl } from '@/config/url.js';
import { get } from 'lodash';
const Item = List.Item;

const GET_PERSON_INFO = getAppUrl() + '/yzSmartGate/app/getPersonSelf';
const PHOTO_API = getAppUrl() + '/yzSmartGate/common/loadDfsPrefix';

function User(props) {
  const [perInfo, setPerInfo] = useState([]); //获取居民
  const [comUrl, setComUrl] = useState('');
  const [initUser, setInitUser] = useState({});
  const handleLink = url => {
    try {
      window.jsInterface.jump(url);
    } catch (err) {
      props.history.push(url);
    }
  };
  // }
  const localrelaod = () => {
    window.location.reload();
  };
  const loginout = () => {
    console.log('退出', 123);
    try {
      window.jsInterface.logout();
    } catch (err) {
      console.log(err);
    }
  };
  const getPerInfo = initUser => {
    fetch.post(GET_PERSON_INFO, { personId: initUser }).then(res => {
      console.log('本人信息', res.data);
      if (get(res, 'state') === 10000) {
        setPerInfo(res.data || {});
      }
    });
  };
  const getComUrl = () => {
    fetch.get(PHOTO_API).then(res => {
      // console.log('com',res.message)
      setComUrl(res.message);
    });
  };

  useEffect(() => {
    // window.location.reload()
    // window.opener.location.href=window.opener.location.href
    // let initUser = null;
    // try {
    //   initUser = JSON.parse(window.jsInterface.getUserInfo());
    //   console.log('安卓获取', initUser);
    // } catch (err) {
    //   initUser = {
    //     password: '',
    //     personId: '',
    //     userName: '',
    //     status: ''
    //   };
    // }
    // setInitUser(initUser);
    // getPerInfo(initUser);
    console.log('------------------', localStorage.getItem('personID'));
    const per = localStorage.getItem('personID');
    setInitUser(per);
    getPerInfo(per);
    getComUrl();
  }, []);
  return (
    <div className="user-page">
      <div className="user-page-header">
        <div className="user-page-header-zhi">智慧家</div>
        <div className="user-page-header-title">
          <div className="user-page-header-title-text">欢迎您-{perInfo.name}</div>
          <div className="user-page-header-title-img">
            <img src={comUrl + perInfo.facePhotoPath} alt="头像" style={{ objectFit: 'cover' }} onClick={localrelaod} />
          </div>
        </div>
      </div>
      <div className="user-page-content">
        <List className="my-list">
          <Item extra={perInfo.address}>我的住址</Item>
        </List>
        <List className="my-list">
          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
              handleLink('/user/member');
            }}>
            绑定账号设置
          </Item>
        </List>
        <List className="my-list">
          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
              handleLink('/user/Modeling');
            }}>
            建模信息
          </Item>
        </List>
        <List className="my-list">
          <Item arrow="horizontal" multipleLine onClick={() => {}}>
            意见反馈
          </Item>
        </List>
        <List className="my-list">
          <Item arrow="horizontal" multipleLine onClick={() => {}}>
            关于
          </Item>
        </List>
        <WingBlank>
          <Button type="primary" className="listItem-page-button" style={{ marginTop: '15px' }} onClick={loginout}>
            退出
          </Button>
          <WhiteSpace />
        </WingBlank>
      </div>
    </div>
  );
}

export default User;
