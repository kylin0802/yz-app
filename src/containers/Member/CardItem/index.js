import React, { Fragment } from 'react';
import Styles from './index.module.less';
import noAvatar from './noAvatar.png';
import icon from '@/images/icon_jiebang.png';
import moment from 'moment';
// import STATUS from '@/config/roleStatus';
import fetch from '@/services/axios';
import { Toast } from 'antd-mobile';
const base64 = 'data:image/jpeg;base64,';
function CardItem(props) {
  console.log(props.user);
  const { user, API, onReload, num, roleStatus: STATUS } = props;
  const pic = !!user.facePhoto ? base64 + user.facePhoto : noAvatar;
  const handleDel = res => {
    console.log(res);
    const { personId, houseId } = user;
    fetch
      .post(API, {
        personId,
        houseId
      })
      .then(res => {
        if (res.state === -1) {
          Toast.fail(res.message);
          onReload();
        } else if (res.state === 10000) {
          Toast.success(res.message);
          onReload();
        }
      });
  };

  return (
    <Fragment>
      <section className={Styles.wrap}>
        <p className={Styles.title}>账号{num}</p>
        <section className={Styles.mod}>
          <section className={Styles.modImg}>
            <img className={Styles.image} src={pic} alt="图片" />
            <div className={Styles.imageInfo}>
              <span className={Styles.imageName}>{user.name}</span>
              <span className={Styles.imageSelect}>{STATUS[user.personType] || '未知'}</span>
            </div>
          </section>
          <section className={Styles.modContent}>
            <div className={Styles.label}>
              <span className={Styles.labelSpan}>手机号</span>
              <span className={Styles.labelItem}>{user.phone || '未绑定'}</span>
            </div>
            <div className={Styles.label}>
              <span className={Styles.labelSpan}>添加时间</span>
              <span className={Styles.labelItem}>{moment(user.createTime * 1000).format('YYYY-MM-DD HH:MM:SS')}</span>
            </div>
          </section>
          <section className={Styles.modFooter}>
            <span
              className={Styles.btn}
              onClick={() => {
                handleDel(user);
              }}>
              <img src={icon} alt="解绑" className={Styles.btnIcon} />
              解绑
            </span>
          </section>
        </section>
      </section>
    </Fragment>
  );
}

export default CardItem;
