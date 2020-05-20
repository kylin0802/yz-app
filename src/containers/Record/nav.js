import React, {useState} from 'react';
import { Flex } from 'antd-mobile';
import classNames from 'classnames';
import './index.less';

const NavItem = ({ className = '', title, ...restProps}) => (
  <div className={`${className} nav-item`} {...restProps}>
    {title}
  </div>
);




function Nav(props) {
    const ActiveStyle = isActive =>  classNames({active: isActive })

    const [navList, setNavList ]= useState([
        {
            title: '今天',
            isActive: true,
        },
        {
            title: '近一周',
            isActive: false,
        },
        {
            title: '近一个月',
            isActive: false,
        }
    ])
    const handleClick= e => {
        const data = navList.map(({title, isActive}, index) => ({
            isActive: e === index,
            title
        }))
        setNavList(data)
    }  
  return (
    <Flex>
        {
            !!navList.length && navList.map(({title, isActive}, index) => (<NavItem className={ActiveStyle(isActive) } title={title} key={title}
            onClick={() => handleClick(index)}
            />)
            )
        }
    </Flex>
  );
}

export default Nav;
