import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import routesConfig from '@/routes/routesConfig';
import Styles from './index.module.less';

const getActiveKey = (path, level = 1, defaultKey = '') => {
  const pathKeys = (path || '').split('/') || [];
  return pathKeys[level] || defaultKey;
};

function Menu(props) {
  const selectedMenu = getActiveKey(window.location.hash);
  const MenuItemStyles = menu => classNames(Styles.MenuItem, { [Styles.Active]: selectedMenu === menu.key });
  return (
    <section className={Styles.Wrapper} style={{ display: 'none' }}>
      {routesConfig.map(menu => {
        return (
          <Link className={MenuItemStyles(menu)} to={`/${menu.key}`} key={menu.key}>
            {menu.icon && <span className={classNames('anticon-user', menu.icon, Styles.MenuIcon)} />}
            <div>{menu.name}</div>
          </Link>
        );
      })}
    </section>
  );
}

export default withRouter(Menu);
