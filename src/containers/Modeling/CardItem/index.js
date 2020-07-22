import React, { Fragment } from 'react';
import Styles from './index.module.less';
import noAvatar from './noAvatar.png';
const base64 = 'data:image/jpeg;base64,';

function CardItem(props) {
  // console.log(props.user);
  const { user, dataInfo, num } = props;
  const pic = !!dataInfo.facePhoto ? base64 + dataInfo.facePhoto : noAvatar;
  return (
    <Fragment>
      <section className={Styles.wrap}>
        <p className={Styles.title}>建模信息{num}</p>
        <section className={Styles.mod}>
          <section className={Styles.modImg}>
            <img className={Styles.image} src={pic} alt="图片" />
            <div className={Styles.imageInfo}>
              <span className={Styles.imageName}>{user.status === 'done' ? '建模成功' : '未知'}</span>
              <span className={Styles.imageSelect}></span>
            </div>
          </section>
          <section className={Styles.modContent}>
            <div className={Styles.label}>
              <span className={Styles.labelSpan}>设备位置</span>
              <span className={Styles.labelItem}>{user.deviceLocation}</span>
            </div>
            <div className={Styles.label}>
              <span className={Styles.labelSpan}>设备名称</span>
              <span className={Styles.labelItem}>{user.deviceName}</span>
            </div>
          </section>
        </section>
      </section>
    </Fragment>
  );
}

export default CardItem;
