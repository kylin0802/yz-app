import React, { useState, useEffect } from 'react';
import { List, InputItem, Picker, Flex, WingBlank, Button, ImagePicker, message } from 'antd-mobile';
import { createForm } from 'rc-form';
import './index.less';
import fetch from '@/services/axios';
import { get } from 'lodash';
import noPhoto from './bg-add.jpg';
import { typeOf } from 'plupload';

// import arrayTreeFilter from 'array-tree-filter';

// import { district, provinceLite } from 'antd-mobile-demo-data';
const GET_USER_INFO_API = '/yzSmartGate/communityAppServer/getPersonSelf';
const DEITOR_USER_API = '/yzSmartGate/communityAppServer/modifyPerson'

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
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState({});
  const [multiple, setMultiple] = useState(false);
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
    try {
      console.log('现在已经绑定 appTakePhoto');
      window.appTakePhoto = appTakePhoto; // 全局钩子，作用： 促使安卓调用
    } catch (err) {
      console.log('绑定报错');
    }
    fetch
      .post(GET_USER_INFO_API, {
        personId: 'Pa5ec091ab78e4c22a46a28eeea891851'
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
      setPhoto(A+JSON.parse(res).base64)
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
          areaId: '004',
          houseId: 'H101101',
          personId: 'Pa5ec091ab78e4c22a46a28eeea891851',
          identity: 31231231123123123,
          facePhoto: photo,
          personType: selectValue
        };
        console.log(val)
        fetch.post(DEITOR_USER_API, val).then(res => {
          console.log(res)
        })
      } else {
        alert('Validation failed');
      }
    });
  };

  // const img =   ! photo ? photo : !!user.facePhotoPath ? user.facePhotoPath : noPhoto

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
          <span className="inline"> 上传照片</span>
          <span className="inline" onClick={onChangeImg}>
            {' '}
            选择图片
          </span>
        </Flex>
        <div className="user-page-upload-content">
          {/* <img src={img} alt="照片"/> */}
          <img src={photo} alt="照片" />
          {/* <ImagePicker
          files={files}
          onClick={onChangeImg}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 1}
          multiple={false}
          length={1}
        /> */}
        </div>
        <WingBlank>
          <Button type="primary" className="user-page-button" style={{ margin: '50px' }} onClick={handleSubmit}>
            保 存
          </Button>
        </WingBlank>
      </section>
    </div>
  );
}

export default createForm()(AddUser);
