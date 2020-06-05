import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, WhiteSpace, Picker, WingBlank, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import fetch from '@/services/axios';
import { get } from 'lodash';
import { getAppUrl } from '@/config/url.js';
// import './index.less';
const PERTYPE_API = getAppUrl() + '/yzSmartGate/communityAppServer/getPersonTypeList';
const ADDPERSON_API = getAppUrl() + '/yzSmartGate/communityAppServer/attachPersonToHouse';

const Binding = props => {
  const [personType, setpersonType] = useState([]); //获取车辆类型
  const { getFieldProps, resetFields } = props.form;
  const [initUser, setInitUser] = useState({});

  const onSubmit = () => {
    //提交数据
    props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log('dasd', props.form.getFieldsValue());
        const formData = props.form.getFieldsValue();
        let val = { ...formData, ownerId: initUser.personId };
        val.personType = formData.personType[0];
        console.log('chashu', val);
        fetch.post(ADDPERSON_API, val).then(res => {
          console.log('返回的值', res);
          if (get(res, 'state') === 10000) {
            Toast.success(res.message);
            resetFields();
          } else {
            Toast.success(res.message);
          }
        });
        resetFields();
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

  useEffect(() => {
    let initUser = null;
    try {
      //   console.log('现在已经绑定 appTakePhoto');
      //   window.appTakePhoto = appTakePhoto; // 全局钩子，作用： 促使安卓调用
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
        <section className="addFamily-page-content-text">绑定成员</section>
        <form>
          <List className="listItem-page-list">
            <WhiteSpace />
            <InputItem {...getFieldProps('phone')} placeholder="请输入成员手机号（必填）">
              成员账号
            </InputItem>
            <WhiteSpace />
            {/* <InputItem {...getFieldProps('identity')} placeholder="请输入成员身份证号码（必填）">
              成员账号
            </InputItem>
            <WhiteSpace /> */}

            <Picker data={personType} cols={1} {...getFieldProps('personType')} className="forss">
              <List.Item arrow="horizontal">成员类型</List.Item>
            </Picker>
            <WhiteSpace />
          </List>
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
export default createForm()(Binding);
