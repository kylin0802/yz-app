import React, { useState, useEffect } from 'react';
import './index.less';
import { List, InputItem, Button, WhiteSpace, WingBlank, Picker, Flex, Icon, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
// import { ADDCAR_API, GETCARtYPE_API, DELETE_API, CARINFO_API } from './api/index';
import fetch from '@/services/axios';
import { get } from 'lodash';
import { getAppUrl } from '@/config/url.js';
const CARINFO_API = getAppUrl() + '/yzSmartGate/app/getPersonSelf';
const ADDCAR_API = getAppUrl() + '/yzSmartGate/app/addVehicle';
const GETCARtYPE_API = getAppUrl() + '/yzSmartGate/app/getVehicleTypeList'; //车辆属性
const DELETE_API = getAppUrl() + '/yzSmartGate/app/delVehicle';

const CarInfo = props => {
  const A = 'data:image/jpeg;base64,';
  const [owerCar, setOwnercar] = useState('');
  const [cartype, setCartype] = useState([]); //车辆类型
  const { validateFields, getFieldProps, resetFields } = props.form;
  const [photo, setPhoto] = useState('');
  const [initUser, setInitUser] = useState({}); //默认值

  const onChangeImg = f => {
    try {
      console.log('调取摄像头');

      window.takePhoto.openCamera(); // 前端调取摄像头
      // console.log(window.takePhoto.takeFromJs())
    } catch (err) {
      console.log('调用摄像头错误', f);
    }
    // setFiles(f)
    // console.log(files, type, index);
    // setFiles(files);
  };
  const getOwnerCar = initUser => {
    //获取本人的照片
    fetch.post(CARINFO_API, { personId: initUser.personId }).then(res => {
      console.log('本人的车辆信息', res.data.vehicle[0]);
      if (get(res, 'state') === 10000) {
        setOwnercar((res.data.vehicle && res.data.vehicle[0]) || {});
      }
    });
  };

  const getCarType = () => {
    //获取车辆类型
    fetch.post(GETCARtYPE_API).then(res => {
      // console.log('车辆类型',res.data)
      if (get(res, 'state') === 10000) {
        let arrdata = res.data || {};
        arrdata = JSON.parse(JSON.stringify(arrdata).replace(/name/g, 'label'));
        arrdata = JSON.parse(JSON.stringify(arrdata).replace(/key/g, 'value'));
        console.log('geugai', arrdata);
        setCartype(arrdata);
      }
    });
  };

  useEffect(() => {
    let initUser = null;
    try {
      console.log('现在已经绑定 appTakePhoto');
      window.appTakePhoto = appTakePhoto; // 全局钩子，作用： 促使安卓调用
      initUser = JSON.parse(window.jsInterface.getUserInfo());
      console.log('安卓获取', initUser);
      console.log('perid', initUser.personId);
    } catch (err) {
      console.log('绑定报错');
      initUser = {
        password: 'password003',
        personId: 'Pa5ec091ab78e4c22a46a28eeea891851',
        userName: '1356669999',
        status: 'localhost'
      };
    }
    setInitUser(initUser);
    getCarType(); //获取车辆的类型
    getOwnerCar(initUser); //获取本人的信息
  }, []);
  const appTakePhoto = res => {
    // 安卓调用前端方法，传base64
    // console.log(111)
    try {
      console.log(typeof res);
      console.log(res);
      console.log('照片路径傻逼', JSON.parse(res).base64);
      setPhoto(JSON.parse(res).base64);
    } catch (err) {
      console.log('照片上传报错');
      setPhoto('111');
    }
  };

  const onSubmite = () => {
    //添加车辆
    console.log('拿到的地址', photo);
    validateFields((err, values) => {
      let param = {
        personId: initUser.personId,
        vehicle: {
          plateNumber: values.plateNumber,
          brand: values.brand,
          model: values.model,
          color: values.color,
          type: values.type[0],
          owner: values.owner,
          vehiclePhoto: photo
        }
      };
      console.log('param', param);
      fetch.post(ADDCAR_API, param).then(res => {
        console.log('添加', res);
        if (get(res, 'state') === 10000) {
          Toast.success(res.message);
        } else {
          Toast.success(res.message);
        }
      });
      // resetFields();
    });
  };
  const onDelete = () => {
    //删除设备
    validateFields((err, values) => {
      let param = {
        personId: initUser.personId,
        vehicle: {
          plateNumber: values.plateNumber
        }
      };
      console.log('param', param);
      fetch.post(DELETE_API, param).then(res => {
        console.log('删除', res);
        if (get(res, 'state') === 10000) {
          Toast.success(res.message);
          resetFields();
          setPhoto('');
          getOwnerCar(initUser); //获取本人的信息
        }
      });
    });
  };

  return (
    <section className="cardInfo-page">
      <section className="cardInfo-page-content">
        <section className="cardInfo-page-content-text">完善基本信息</section>

        <List className="cardInfo-page-content-text-list">
          <WhiteSpace />
          <InputItem
            {...getFieldProps('brand', { initialValue: owerCar.brand || '' })}
            placeholder="请输入车辆品牌（必填）">
            车牌品牌
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('model', { initialValue: owerCar.model || '' })} placeholder="车辆型号（必填）">
            车辆型号
          </InputItem>
          <WhiteSpace />

          <InputItem
            {...getFieldProps('plateNumber', { initialValue: owerCar.plateNumber || '' })}
            placeholder="车辆号牌（必填）">
            车辆号牌
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('color', { initialValue: owerCar.color || '' })} placeholder="车辆颜色（必填）">
            车辆颜色
          </InputItem>
          <WhiteSpace />

          <Picker
            data={cartype}
            cols={1}
            {...getFieldProps('type', { initialValue: [owerCar.type || ''] })}
            className="forss"
            // value={[owerCar.type]}
            // onChange={onChangeColor}
          >
            <List.Item arrow="horizontal">车辆类型</List.Item>
          </Picker>
          <WhiteSpace />

          <InputItem
            {...getFieldProps('owner', { initialValue: owerCar.owner || '' })}
            placeholder="请输入车辆所属人（必填）">
            车辆所属人
          </InputItem>
        </List>
      </section>
      <section className="user-page-upload">
        <Flex justify="between" className="user-page-upload-title">
          <span className="inline"> 上传照片</span>
          <span className="inline" onClick={onChangeImg}>
            选择图片
          </span>
        </Flex>
        <div className="user-page-upload-content">
          {/* <img src={photo} /> */}
          <div className="user-page-image">
            {!!photo || !!owerCar.vehiclePhoto ? (
              // <img src={A+photo && A+owerCar.vehiclePhoto} alt="照片" onClick={onChangeImg} />
              <img src={!!photo ? A + photo : A + owerCar.vehiclePhoto} alt="照片" onClick={onChangeImg} />
            ) : (
              <Icon type="plus" onClick={onChangeImg} />
            )}
          </div>
        </div>
        <WingBlank>
          <Button type="primary" style={{ marginTop: '75px' }} onClick={onSubmite}>
            保存
          </Button>
          <Button type="danger" style={{ marginTop: '5px' }} onClick={onDelete}>
            删除
          </Button>
        </WingBlank>
      </section>
    </section>
  );
};
export default createForm()(CarInfo);
