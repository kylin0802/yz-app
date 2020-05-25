import React from 'react';
import './index.less';
import moment from 'moment';

const ListHead = ({ RowData }) => (
  <section className="list-head">
    {!!RowData.length &&
      RowData.map(item => (
        <span className="list-head-span" key={item.key}>
          <span className="cicle" />
          {item.title}
        </span>
      ))}
  </section>
);

const ListItem = ({ DataSource, RowData }) => (
  <section className="list-item">
    {!!DataSource.length &&
      DataSource.map((item, index) => {
        return (
          <div key={index} className="list-item-inner">
            {!!RowData.length &&
              RowData.map((rowItem, index) => {
                let title;
                if (rowItem.key === 'occurTime') {
                  title = moment(item[rowItem.key] * 1000).format('MM-DD HH:mm:ss');
                } else if (rowItem.key === 'passResult') {
                  title = item[rowItem.key] === 'reject' ? '拒绝通行' : '允许通行';
                } else if (rowItem.key === 'personType') {
                  title = item[rowItem.key] === '"visitor"' ? '访客' : '房主';
                }

                return (
                  <span className="list-item-span" key={rowItem.key}>
                    {title}
                  </span>
                );
              })}
          </div>
        );
      })}
  </section>
);

function List(props) {
  return (
    <section>
      <ListHead {...props} />
      <ListItem {...props} />
    </section>
  );
}

export default List;
