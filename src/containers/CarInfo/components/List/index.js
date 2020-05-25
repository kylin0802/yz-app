import React, { useState } from 'react';
import { List, InputItem, ImagePicker, Button, WhiteSpace, Picker, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
// import arrayTreeFilter from 'array-tree-filter';
// import { district, provinceLite } from 'antd-mobile-demo-data';
import './index.less';
const Item = List.Item;

const district = [
  {
    label: '微型车',
    value: 'small'
  },
  {
    label: '小型车',
    value: 'smallcar'
  },
  {
    label: '紧凑车',
    value: 'jing'
  },
  {
    label: '中级车',
    value: 'middle'
  },
  {
    label: '中高级车',
    value: 'middleHigh'
  },
  {
    label: '豪华车',
    value: 'supper'
  },
  {
    label: 'SUV',
    value: 'SUV'
  },
  {
    label: 'MPV',
    value: 'MPV'
  }
];
const colors = [
  {
    label: '红色',
    value: 'red'
  },
  {
    label: '绿色',
    value: 'green'
  },
  {
    label: '黄色',
    value: 'yellow'
  }
];
// const data = [{
//   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//   id: '2121',
// }, {
//   url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
//   id: '2122',
// }];

const ListItem = props => {
  const [multiple, setmultiple] = useState(false);
  const [files, setFiles] = useState([]);
  const { getFieldError, getFieldProps } = props.form;

  const onSubmit = () => {
    props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log('dasd', props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  };
  const onChange = (files, type, index) => {
    console.log(files, type, index);
    setFiles(files);
  };
  return (
    <div className="listItem-page">
      <form>
        <List className="listItem-page-list">
          <InputItem {...getFieldProps('name')} placeholder="请输入车辆品牌（必填）">
            车牌品牌
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('type')} placeholder="车辆型号">
            车辆型号
          </InputItem>
          <WhiteSpace />

          <InputItem {...getFieldProps('carId')} placeholder="车辆号牌">
            车辆号牌
          </InputItem>
          <WhiteSpace />

          <Picker
            data={colors}
            // value={colorValue}
            cols={1}
            // onChange={onChangeColor}
            {...getFieldProps('color')}>
            <List.Item arrow="horizontal">车辆颜色</List.Item>
          </Picker>
          <WhiteSpace />

          <Picker data={district} cols={1} {...getFieldProps('cartype')} className="forss">
            <List.Item arrow="horizontal">车辆类型</List.Item>
          </Picker>
          <WhiteSpace />

          <InputItem {...getFieldProps('person')} placeholder="请输入车辆所属人（必填）">
            车辆所属人
          </InputItem>
          <WhiteSpace />

          <ImagePicker
            files={files}
            onChange={onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 7}
            multiple={multiple}
          />
          <WhiteSpace />
        </List>
        <WingBlank>
          <Button type="primary" className="listItem-page-button" onClick={onSubmit}>
            完成
          </Button>
        </WingBlank>
      </form>
    </div>
  );
};
export default createForm()(ListItem);
