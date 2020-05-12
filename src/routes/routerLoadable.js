import React from 'react';
import loadable from 'react-loadable'; // 提高加载

function asyncImport(loader) {
  function Loading(props) {
    // console.log(props.error);
    if (props.error) return <div> Error! </div>;
    else if (props.pastDelay) return '加载中...';
    else return null;
  }

  return loadable({
    loader,
    loading: Loading
  });
}

export { asyncImport };
