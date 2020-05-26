import React, { useState, useEffect } from 'react';
import { List, InputItem, ImagePicker, Button, WhiteSpace, WingBlank, Toast, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { ADDCAR_API, GETCARtYPE_API } from '../../api/index';
import fetch from '@/services/axios';
import './index.less';

const seasons = [
  [
    {
      label: '2013',
      value: '2013'
    },
    {
      label: '2014',
      value: '2014'
    }
  ],
  [
    {
      label: '春',
      value: '春'
    },
    {
      label: '夏',
      value: '夏'
    }
  ]
];

const ListItem = props => {
  const [cartype, setCartype] = useState([]);
  const { validateFields, getFieldProps, resetFields } = props.form;

  const onSubmite = () => {
    validateFields((err, values) => {
      let param = {
        personId: '32200001999200',
        vehicle: {
          plateNumber: values.plateNumber,
          brand: values.brand,
          model: values.model,
          color: values.color,
          type: values.type,
          owner: values.owner
          // "vehiclePhoto":values.vehiclePhoto.url
        }
      };
      console.log('param', param);
      //  fetch.post(ADDCAR_API,param).then(res=>{
      //    console.log('添加',res)
      //  })
      resetFields();
      // }

      //       try{
      //         window.getAllResponseHeaders('Set-Cookie')
      //       }
      // catch(e){
      //         console.log(e)
      // }
    });
  };

  const getCarType = () => {
    fetch.post(GETCARtYPE_API).then(res => {
      console.log('车辆类型', res.data);
      // alert(res.message)
      setCartype(res.data);
      console.log('cartype', cartype);
    });
  };
  useEffect(() => {
    getCarType();
  }, []);
  // const onChange = (files, type, index) => {
  //   console.log('添加的照片',files, type, index);
  //   setFiles(files);

  // };
  return (
    <div className="listItem-page">
      <form>
        <List className="listItem-page-list">
          <InputItem {...getFieldProps('brand')} placeholder="请输入车辆品牌（必填）">
            车牌品牌
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('model')} placeholder="车辆型号">
            车辆型号
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('plateNumber')} placeholder="车辆号牌">
            车辆号牌
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('color')} placeholder="车辆颜色">
            车辆颜色
          </InputItem>
          <WhiteSpace />

          <Picker data={seasons} cols={1} {...getFieldProps('type')} className="forss">
            <List.Item arrow="horizontal">车辆类型</List.Item>
          </Picker>

          <WhiteSpace />

          <InputItem {...getFieldProps('owner')} placeholder="请输入车辆所属人（必填）">
            车辆所属人
          </InputItem>
          <WhiteSpace />

          {/* <ImagePicker
            files={files}
            onChange={onChange}
            onImageClick={(index, fs) => console.log('nicai',index, fs)}
            selectable={files.length < 7}
            multiple={multiple}
          /> */}
          <WhiteSpace />
        </List>
        <WingBlank>
          <Button type="primary" className="listItem-page-button" onClick={onSubmite}>
            完成
          </Button>
        </WingBlank>
      </form>
    </div>
  );
};
export default createForm()(ListItem);
