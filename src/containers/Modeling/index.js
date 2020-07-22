import React, { useEffect, useState } from 'react';
import fetch from '@/services/axios';
import { getAppUrl } from '@/config/url.js';
import CardItem from './CardItem';

const GET_PERSON_INFO = getAppUrl() + '/yzSmartGate/app/getPersonSelf';

function Modeling(props) {
  const [list, setList] = useState([]);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    document.title = '建模信息';
    fetch.post(GET_PERSON_INFO, { personId: localStorage.getItem('personID') }).then(res => {
      //  console.log('res',res.data.photoTemplateStatusList)
      const data = res.data && res.data.photoTemplateStatusList ? res.data.photoTemplateStatusList : [];
      const dataInfo = res.data && res.data ? res.data : [];
      setList(data);
      setInfo(dataInfo);
    });
  }, []);
  return (
    <div>
      {!!list.length ? (
        list.map((item, index) => (
          <CardItem
            user={item}
            dataInfo={info}
            key={item.deviceId}
            // API={DELETE_USER_API}
            // onReload={reload}
            num={index + 1}
            // roleStatus={roleStatus}
          />
        ))
      ) : (
        <p style={{ textAlign: 'center', lineHeight: '100px', fontSize: '16px' }}>暂无建模数据...</p>
      )}
    </div>
  );
}
export default Modeling;
