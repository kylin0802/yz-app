import React, { useState, useEffect } from 'react';
import { List, InputItem, Picker, Flex, WingBlank, Button, Toast, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import './index.less';
import fetch from '@/services/axios';
import { get } from 'lodash';

const GET_USER_INFO_API = '/yzSmartGate/communityAppServer/getPersonSelf';
const DEITOR_USER_API = '/yzSmartGate/communityAppServer/modifyPerson'
// const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const option = [
  [
    {
      label: '租客',
      value: false
    },
    {
      label: '房东',
      value: true
    }
  ]
];

function AddUser(props) {
  const A = 'data:image/jpeg;base64,';
  const { getFieldProps } = props.form;
  const [user, setUser] = useState({});
  const [initUser,setInitUser] = useState({})
  const [selectValue, setSelectValue] = useState(false);
  const [photo, setPhoto] = useState('');
  const onChangeImg = f => {
    try {
      console.log('调取摄像头');
      window.takePhoto.takeFromJs(); // 前端调取摄像头
      // console.log(window.takePhoto.takeFromJs())
    } catch (err) {
      console.log('调用摄像头错误', f);
    }
    // setFiles(f)
    // console.log(files, type, index);
    // setFiles(files);
  };

  useEffect(() => {
    let initUser = null
    try {
      console.log('现在已经绑定 appTakePhoto');
      window.appTakePhoto = appTakePhoto; // 全局钩子，作用： 促使安卓调用
      initUser = JSON.parse(window.jsInterface.getUserInfo())
      console.log('安卓获取', initUser)
    } catch (err) {
      initUser = {
        "password":"password003",
        "personId":"Pa5ec091ab78e4c22a46a28eeea891851",
        "userName":"1356669999",
        "status": "localhost"
      }    
    }
    setInitUser(initUser)

    fetch
      .post(GET_USER_INFO_API, {
        personId: initUser.personId
      })
      .then(res => {
        console.log(res);
        if (get(res, 'state') === 10000) {
            setUser(res.data || {});
        }
      });
  }, []);

  const appTakePhoto = res => { // 安卓调用前端方法，传base64
    // console.log(111)
    try {
      console.log(typeof res);
      console.log(res)
      console.log('照片路径傻逼', JSON.parse(res).base64);
      setPhoto(JSON.parse(res).base64)
    } catch (err) {
      console.log('照片上传报错');
      setPhoto('111');
      
    }
  };

  const handleSubmit = e => {
    props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log('测试', props.form.getFieldsValue());
        let val = {
          ...props.form.getFieldsValue(),
          areaId: user.areaId || '',
          houseId: user.houseId || '',
          personId: initUser.personId,
          facePhoto: photo,
          personType: selectValue
        };
        console.log(val)
        fetch.post(DEITOR_USER_API, val).then(res => {
          console.log(res)
          if(get(res, 'state') === 10000) {
            Toast.success(res.message)
          }
        })
      } else {
        alert('Validation failed');
      }
    });
  };


  return (
    <div className="user-page">
      <div className="user-page-title">完善基本信息 享受智能家庭生活！</div>

      <section className="user-page-form">
        <List>
          <InputItem {...getFieldProps('name', { initialValue: user.name || '' })} placeholder="姓名">
            姓名
          </InputItem>
          <InputItem
            {...getFieldProps('identity', { initialValue: user.identity || '' })}
            // type="phone"
            clear
            placeholder="省份证号">
            省份证号
          </InputItem>
          <List.Item>
            <Picker
              data={option}
              title=""
              cascade={false}
              // extra="请选择(可选)"
              value={[selectValue]}
              // value={this.state.sValue}
              onChange={v => setSelectValue(v[0])}
              //   onOk={v => this.setState({ sValue: v })}
            >
              <List.Item arrow="horizontal">类型</List.Item>
            </Picker>
          </List.Item>
        </List>
      </section>
      <section className="user-page-upload">
        <Flex justify="between" className="user-page-upload-title">
          <span className="inline">上传照片</span>
          <span className="inline" onClick={onChangeImg}>
       
            选择图片
          </span>
        </Flex>
        <div className="user-page-upload-content">
          {/* <img src={img} alt="照片"/> */}
          <div className="user-page-image">
          {
            !!user.facePhotoPath ? <img src={!!photo? A + photo: A + user.facePhotoPath } alt="照片" onClick={onChangeImg} />:  <Icon type="plus" />
          }
          </div>
        </div>
        <WingBlank>
          <Button type="primary" className="user-page-button" style={{ margin: '50px 0' }} onClick={handleSubmit}>
            保 存
          </Button>
        </WingBlank>
      </section>
    </div>
  );
}

export default createForm()(AddUser);
