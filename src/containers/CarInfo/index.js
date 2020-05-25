import React, { useState, useEffect } from 'react';
import './index.less';
import { List, InputItem, Button, WhiteSpace, WingBlank, Picker, Flex, ImagePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { ADDCAR_API, GETCARtYPE_API, DELETE_API, CARINFO_API } from './api/index';
import fetch from '@/services/axios';

const CarInfo = props => {
  const A = 'data:image/jpeg;base64,';
  const [owerCar, setOwnercar] = useState('');
  const [cartype, setCartype] = useState([]); //车辆类型
  const [files, setfiles] = useState([]); //上传照片
  const [multiple, setmultiple] = useState(false); //是否多选
  const { validateFields, getFieldProps, resetFields } = props.form;
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
  const getOwnerCar = () => {
    //获取本人的照片
    fetch.post(CARINFO_API, { personId: 'Pa5ec091ab78e4c22a46a28eeea891851' }).then(res => {
      console.log('本人的车辆信息', res.data.vehicle[0]);
      setOwnercar(res.data.vehicle[0] || {});
    });
  };

  const getCarType = () => {
    //获取车辆类型
    fetch.post(GETCARtYPE_API).then(res => {
      // console.log('车辆类型',res.data)
      let arrdata = res.data;
      arrdata = JSON.parse(JSON.stringify(arrdata).replace(/desc/g, 'label'));
      console.log('geugai', arrdata);
      setCartype(arrdata);
    });
  };

  useEffect(() => {
    try {
      console.log('现在已经绑定 appTakePhoto');
      window.appTakePhoto = appTakePhoto; // 全局钩子，作用： 促使安卓调用
    } catch (err) {
      console.log('绑定报错');
    }
    getCarType(); //获取车辆的类型
    getOwnerCar(); //获取本人的信息
  }, []);
  const appTakePhoto = res => {
    // 安卓调用前端方法，传base64
    // console.log(111)
    try {
      console.log(typeof res);
      console.log(res);
      console.log('照片路径傻逼', JSON.parse(res).base64);
      setPhoto(A + JSON.parse(res).base64);
    } catch (err) {
      console.log('照片上传报错');
      setPhoto('111');
    }
  };

  const onSubmite = () => {
    //添加车辆
    validateFields((err, values) => {
      let param = {
        personId: 'Pa5ec091ab78e4c22a46a28eeea891851',
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
      });
      resetFields();
    });
  };
  return (
    <section className="cardInfo-page">
      <section className="cardInfo-page-content">
        <section className="cardInfo-page-content-text">完善基本信息</section>

        <List className="cardInfo-page-content-text-list">
          <InputItem
            {...getFieldProps('brand', { initialValue: owerCar.brand || '' })}
            placeholder="请输入车辆品牌（必填）">
            车牌品牌
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('model', { initialValue: owerCar.model || '' })} placeholder="车辆型号">
            车辆型号
          </InputItem>
          <WhiteSpace />

          <InputItem
            {...getFieldProps('plateNumber', { initialValue: owerCar.plateNumber || '' })}
            placeholder="车辆号牌">
            车辆号牌
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('color', { initialValue: owerCar.color || '' })} placeholder="车辆颜色">
            车辆颜色
          </InputItem>
          <WhiteSpace />

          <Picker
            data={cartype}
            cols={1}
            {...getFieldProps(
              'type'
              // {initialValue: owerCar.type}
            )}
            className="forss"
            value={[owerCar.type]}>
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
            {' '}
            选择图片
          </span>
        </Flex>
        <div className="user-page-upload-content">
          {/* <img src={img} alt="照片"/> */}
          <img src={photo} alt="照片" />
        </div>
        <WingBlank>
          <Button type="primary" style={{ marginTop: '75px' }} onClick={onSubmite}>
            完成
          </Button>
        </WingBlank>
      </section>
    </section>
  );
};
export default createForm()(CarInfo);
