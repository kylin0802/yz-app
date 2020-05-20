import React from 'react';
import './index.less';

const ListHead =( {RowData} )=>  (<section className="list-head">
{
    !!RowData.length && RowData.map(item => (
    <span className="list-head-span" key={item.key}><span className="cicle" />{item.title}</span>
    ))
}
</section>)


const ListItem =( {DataSource, RowData} )=>  (<section className="list-item">

   { !!DataSource.length && DataSource.map((item, index) => {
        
         return (
            <div key={index} className="list-item-inner">
            {!!RowData.length && RowData.map((rowItem, index) => (
                <span className="list-item-span" key={rowItem.key}>{item[rowItem.key]}</span>))
            
            }
                </div>
         )
    })

}



</section>)

function List(props) {
  return <section>
     <ListHead {...props}/>
    <ListItem {...props}/>

  </section>;
}

export default List;
