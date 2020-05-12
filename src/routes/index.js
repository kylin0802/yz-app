import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routesConfig from './routesConfig';
import queryString from 'query-string';

// 权限限制规则
const requiredRules = {
  /**
   * 判断是否登录
   * @return true 条件满足 通过权限验证
   */
  loginRequired(path) {
    // const localStorage = window.localStorage;
    // const strReactAdminUserInfo = localStorage.getItem('userInfo') || '{}';
    // const reactAdminUserInfo = JSON.parse(strReactAdminUserInfo);
    // return get(reactAdminUserInfo, 'userInfo.userName', false);
    return true
  }
};

/**
 * @param  {Protected:登陆拦截（函数组建）}
 * @return {还是一个Route组件，这个Route组建使用的是Route三大渲染方式（component、render、children）的render方式}
 */
const Protected = ({ component: Comp, ...rest }) => {
  // console.log(rest, rest);
  const { exact, path, meta, setTagPage, ...otherRest } = rest;
  return (
    <Route
      path={path}
      exact={exact}
      {...rest}
      render={prams => {
        const { title } = rest.meta;
        document.title = title || '测试';

        //路由拦截 进入页面前 检查
        if (meta.rules && meta.rules instanceof Array) {
          const middlewares = meta.rules.map(item => requiredRules[item]);
          for (let i = 0; i < middlewares.length; i++) {
            const result = middlewares[i](path);
            if (!result) {
              // window.location.href = '/login'
              // return
              return <Redirect to="/login" />;
            }
          }
        }

        // 设置 redux tagPage 当前路径
        //setTagPage({ path: path, title: meta.title });

        return <Comp {...otherRest} {...prams} />;
      }}
    />
  );
};

const routerApp = props => {
  const query = queryString.parse(props.location.search);
  props.match.query = query;
  return (
    <Switch>
      {routesConfig.map(item => (
        <Protected {...props} path={item.path} component={item.component} key={item.path} exact meta={item.meta} />
      ))}
      <Route render={() => <Redirect to="/app" />} />
    </Switch>
  );
};

export default routerApp;
// Switch 里面不应该有其他的标签
