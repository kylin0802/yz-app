import React from 'react';
import { Tabs } from 'antd-mobile';
import Nav from './nav.js';
import List from './list.js';
import ListItem from 'antd-mobile/lib/list/ListItem';

const tabs = [{ title: '通行记录 ' }, { title: '报警记录' }];

const ListA = [
  { time: '05/10 2:34:23', state: '指纹识别  ', useState: '租客' },
  { time: '05/11 12:34:23', state: '指纹识别  ', useState: '户主' },
  { time: '05/13 12:34:23', state: '指纹识别  ', useState: '户主' },
  { time: '05/14 12:34:23', state: '指纹识别  ', useState: '户主' },
  { time: '05/15 12:34:23', state: '指纹识别  ', useState: '租客' },
  { time: '05/16 2:34:23', state: '指纹识别  ', useState: '户主' },
  { time: '05/17 12:04:23', state: '指纹识别  ', useState: '户主' },
  { time: '05/18 12:04:23', state: '指纹识别  ', useState: '租客' },
  { time: '05/19 12:34:23', state: '指纹识别  ', useState: '户主' }
];

const RowA = [
  { title: '通行时间', name: 'time', key: 'time' },
  { title: '通行方式', name: 'state', key: 'state' },
  { title: '通行人', name: 'userstate', key: 'useState' }
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
  { title: '通行时间', name: 'time', key: 'time' },
  { title: '通行方式', name: 'state', key: 'state' }
];

function Record() {
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
            <Nav />
          </section>
          <List DataSource={ListA} RowData={RowA} />
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
