import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, WhiteSpace, Picker, WingBlank, Flex, Icon, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import fetch from '@/services/axios';
import { get } from 'lodash';
import { getAppUrl } from '@/config/url.js';
import './index.less';
const PERTYPE_API = getAppUrl() + '/yzSmartGate/app/getPersonTypeList';
const ADDPERSON_API = getAppUrl() + '/yzSmartGate/app/addPersonByHouseOwner';

const AddFamily = props => {
  const A = 'data:image/jpeg;base64,';
  const [personType, setpersonType] = useState([]); //获取车辆类型
  const { getFieldProps, resetFields } = props.form;
  const [initUser, setInitUser] = useState({});
  const [photo, setPhoto] = useState('');

  const onSubmit = () => {
    //提交数据
    props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log('dasd', props.form.getFieldsValue());
        const formData = props.form.getFieldsValue();
        let val = { ...formData, facePhoto: photo, personId: initUser.personId };
        val.personType = formData.personType ? formData.personType[0] : '';
        // console.log('chashu', val);
        fetch.post(ADDPERSON_API, val).then(res => {
          console.log('返回的值', res);
          if (get(res, 'state') === 10000) {
            Toast.success(res.message);
            resetFields();
            setPhoto('');
          } else {
            Toast.success(res.message);
          }
        });
        // resetFields()
      } else {
        alert('Validation failed');
      }
    });
  };
  const getPersonType = () => {
    //拿到成员的类型
    fetch.post(PERTYPE_API).then(res => {
      if (get(res, 'state') === 10000) {
        // console.log('拿到的数据',res)
        let arrdata = JSON.parse(JSON.stringify(res.data).replace(/desc/g, 'label'));
        // console.log('修改后的数据',arrdata)
        setpersonType(arrdata);
      }
    });
  };
  const onChangeImg = f => {
    try {
      console.log('调取摄像头');
      window.takePhoto.openFaceCamera(); // 前端调取摄像头
      // console.log(window.takePhoto.takeFromJs())
    } catch (err) {
      console.log('调用摄像头错误', f);
    }
    // setFiles(f)
    // console.log(files, type, index);
    // setFiles(files);
  };

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

  useEffect(() => {
    let initUser = null;
    try {
      console.log('现在已经绑定 appTakePhoto');
      window.appTakePhoto = appTakePhoto; // 全局钩子，作用： 促使安卓调用
      initUser = JSON.parse(window.jsInterface.getUserInfo());
      console.log('安卓获取', initUser);
    } catch (err) {
      initUser = {
        password: 'password003',
        personId: 'Pa5ec091ab78e4c22a46a28eeea891851',
        userName: '1356669999',
        status: 'localhost'
      };
    }
    setInitUser(initUser);
    getPersonType();
  }, []);

  return (
    <section className="addFamily-page">
      <section className="addFamily-page-content">
        <section className="addFamily-page-content-text">添加成员</section>
        <form>
          <List className="listItem-page-list">
            <WhiteSpace />
            <InputItem {...getFieldProps('name')} placeholder="请输入成员姓名（必填）">
              成员姓名
            </InputItem>
            <WhiteSpace />
            <InputItem {...getFieldProps('identity')} placeholder="请输入成员身份证号码（必填）">
              成员账号
            </InputItem>
            <WhiteSpace />
            <InputItem {...getFieldProps('phone')} placeholder="请输入成员电话（必填）">
              成员电话
            </InputItem>
            <WhiteSpace />
            <Picker data={personType} cols={1} {...getFieldProps('personType')} className="forss">
              <List.Item arrow="horizontal">成员类型</List.Item>
            </Picker>
            <WhiteSpace />
          </List>
          <section className="user-page-upload">
            <Flex justify="between" className="user-page-upload-title">
              <span className="inline">上传照片</span>
              <span className="inline" onClick={onChangeImg}>
                {''}
                选择图片
              </span>
            </Flex>
            <div className="user-page-upload-content">
              {/* <img src={img} alt="照片"/> */}
              <div className="user-page-image">
                {photo ? (
                  <img src={A + photo} alt="照片" onClick={onChangeImg} />
                ) : (
                  <Icon type="plus" onClick={onChangeImg} />
                )}
              </div>
            </div>
            <WhiteSpace />
          </section>
          <WingBlank>
            <Button type="primary" className="listItem-page-button" style={{ marginTop: '15px' }} onClick={onSubmit}>
              保存
            </Button>
            <WhiteSpace />
          </WingBlank>
        </form>
      </section>
    </section>
  );
};
export default createForm()(AddFamily);
