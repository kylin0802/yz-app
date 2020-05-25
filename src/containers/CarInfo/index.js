import React, { useState, useEffect } from 'react';
import './index.less';
import { List, InputItem, Button, WhiteSpace, WingBlank, Picker, ImagePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { ADDCAR_API, GETCARtYPE_API, DELETE_API, CARINFO_API } from './api/index';
import fetch from '@/services/axios';

const CarInfo = props => {
  const [owerCar, setOwnercar] = useState('');
  const [cartype, setCartype] = useState([]); //车辆类型
  const [files, setfiles] = useState([]); //上传照片
  const [multiple, setmultiple] = useState(false); //是否多选
  const { validateFields, getFieldProps, resetFields } = props.form;

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
          vehiclePhoto: files[0].url
        }
      };
      console.log('param', param);
      fetch.post(ADDCAR_API, param).then(res => {
        console.log('添加', res);
      });
      resetFields();
    });
  };

  const onDelete = () => {
    //删除车辆
    let param = {
      personId: 'Pa5ec091ab78e4c22a46a28eeea891851',
      vehicle: {
        plateNumber: '4'
      }
    };
    fetch.post(DELETE_API, param).then(res => {
      console.log('qw', res);
    });
  };

  const getOwnerCar = () => {
    //获取本人的照片
    fetch.post(CARINFO_API, { personId: 'Pa5ec091ab78e4c22a46a28eeea891851' }).then(res => {
      console.log('本人的车辆信息', res.data.vehicle[0]);
      setOwnercar(res.data.vehicle[0]);
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
  const onChange = (files, type, index) => {
    //选择的照片
    console.log(files[0].url, type, index);
    setfiles(files);
  };
  const aa = res => {
    console.log('aa', aa);
  };

  useEffect(() => {
    getCarType(); //获取车辆的类型
    getOwnerCar(); //获取本人的信息
    window.aa = aa;
  }, []);

  return (
    <section className="cardInfo-page">
      <section className="cardInfo-page-content">
        <section className="cardInfo-page-content-text">完善基本信息</section>
        <form>
          <List className="cardInfo-page-content-text-list">
            <InputItem
              {...getFieldProps(
                'brand'
                // {initialValue: owerCar.brand}
              )}
              placeholder="请输入车辆品牌（必填）">
              车牌品牌
            </InputItem>
            <WhiteSpace />

            <InputItem
              {...getFieldProps(
                'model'
                // {initialValue: owerCar.model}
              )}
              placeholder="车辆型号">
              车辆型号
            </InputItem>
            <WhiteSpace />

            <InputItem
              {...getFieldProps(
                'plateNumber'
                // {initialValue: owerCar.plateNumber}
              )}
              placeholder="车辆号牌">
              车辆号牌
            </InputItem>
            <WhiteSpace />

            <InputItem
              {...getFieldProps(
                'color'
                // {initialValue: owerCar.color}
              )}
              placeholder="车辆颜色">
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
              // value={[owerCar.type]}
            >
              <List.Item arrow="horizontal">车辆类型</List.Item>
            </Picker>
            <WhiteSpace />

            <InputItem
              {...getFieldProps(
                'owner'
                // {initialValue: owerCar.owner}
              )}
              placeholder="请输入车辆所属人（必填）">
              车辆所属人
            </InputItem>
            {/* <WhiteSpace /> */}

            <ImagePicker
              files={files}
              onChange={onChange}
              onImageClick={(index, fs) => console.log('nicai', index, fs)}
              selectable={files.length < 1}
              multiple={multiple}
            />
            {/* <WhiteSpace /> */}
          </List>
          <WingBlank>
            <Button type="primary" className="listItem-page-button" onClick={onSubmite}>
              完成
            </Button>
            <Button onClick={onDelete}>删除车辆</Button>
          </WingBlank>
        </form>
      </section>
    </section>
  );
};
export default createForm()(CarInfo);
