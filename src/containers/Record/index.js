import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import Nav from './nav.js';
import List from './list.js';
import fetch from '@/services/axios';
import { getAppUrl } from '@/config/url.js';
const GET_LIST_API = getAppUrl() + '/yzSmartGate/communityAppServer/queryPassthroughByPerson';

const tabs = [{ title: '通行记录 ' }, { title: '报警记录' }];

const RowA = [
  {
    title: '通行时间',
    name: 'occurTime',
    key: 'occurTime',
    render: res => {
      console.log(res);
    }
  },
  { title: '通行方式', name: 'passResult ', key: 'passResult' },
  { title: '通行人', name: 'personType', key: 'personType' }
];

const ListB = [
  { time: '05/10 2:34:23', state: '入侵报警' },
  { time: '05/11 12:34:23', state: '入侵报警  ' },
  { time: '05/13 12:34:23', state: '入侵报警  ' },
  { time: '05/14 12:34:23', state: '入侵报警  ' },
  { time: '05/15 12:34:23', state: '入侵报警  ' },
  { time: '05/16 2:34:23', state: '入侵报警  ' },
  { time: '05/17 12:04:23', state: '入侵报警  ' },
  { time: '05/18 12:04:23', state: '入侵报警  ' },
  { time: '05/19 12:34:23', state: '入侵报警  ' }
];

const RowB = [
  {
    title: '通行时间',
    name: 'time',
    key: 'time',
    render: res => {
      console.log(res);
    }
  },
  { title: '通行方式', name: 'state', key: 'state' }
];
const day = 24 * 60 * 60;
const week = 24 * 60 * 60 * 7;
const month = 24 * 60 * 60 * 30 * 7;
const currentDay = parseInt(+new Date() / 1000);
const OneDay = currentDay - day;
const OneMonth = currentDay - month;
const OneWeek = currentDay - week;

// const currentDay  = + new Date()
function Record() {
  const [beginTime, setBeginTime] = useState(OneDay);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch
      .post(GET_LIST_API, {
        personId: 'P67c6d587d5834e7ea637936707e793d0',
        beginTime,
        endTime: currentDay, //当前时间
        pageNumber: 1,
        pageSize: 100
        // pageNumber: 0,
        // pageSize: 100
      })
      .then(res => {
        console.log(res);
        // setList(res.data.content);
      });
  }, [beginTime]);
  const onSubmit = type => {
    console.log(type);
    switch (type) {
      case 'day':
        setBeginTime(OneDay);
        break;
      case 'week':
        setBeginTime(OneWeek);
        break;
      case 'month':
        setBeginTime(OneMonth);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Tabs
        tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => {
          console.log('onChange', index, tab);
        }}
        onTabClick={(tab, index) => {
          console.log('onTabClick', index, tab);
        }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <section style={{ backgroundColor: '#fff' }}>
            <Nav onSubmit={onSubmit} />
          </section>
          <List DataSource={list} RowData={RowA} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
          <section style={{ backgroundColor: '#fff' }}>
            <Nav />
          </section>
          <List DataSource={ListB} RowData={RowB} />
        </div>
      </Tabs>
    </div>
  );
}

export default Record;
