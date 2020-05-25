import React from 'react';
import { List, InputItem, Button, WhiteSpace, Picker, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import './index.less';
const district = [
  {
    label: '父母',
    value: 'parents'
  },
  {
    label: '兄弟/姊妹',
    value: 'brother'
  },
  {
    label: '租客',
    value: 'tenant'
  },
  {
    label: '其他',
    value: 'other'
  }
];
const ListItem = props => {
  const { getFieldProps } = props.form;
  const onSubmit = () => {
    props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log('dasd', props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  };
  return (
    <div className="listItem-page">
      <form>
        <List className="listItem-page-list">
          <InputItem {...getFieldProps('name')} placeholder="请输入对方账号">
            对方账号
          </InputItem>
          <WhiteSpace />
          <Picker data={district} cols={1} {...getFieldProps('familytype')} className="forss">
            <List.Item arrow="horizontal">成员类型</List.Item>
          </Picker>
          <WhiteSpace />
        </List>
        <WingBlank>
          <Button type="primary" className="listItem-page-button" onClick={onSubmit}>
            完成
          </Button>
          <WhiteSpace />
        </WingBlank>
      </form>
    </div>
  );
};
export default createForm()(ListItem);
