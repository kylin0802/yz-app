import React, { useReducer } from "react";


/**
 * useRecucer 的理解
 * 
 * 每个 reducer 都要返回一个有效的状态值。或者抛出错误。
 * 输入旧 state 根据 action 返回新 state。这就是 reducer 的作用。
 * 参考官网：http://react.html.cn/docs/hooks-reference.html#usereducer
 */
export const LOADING_STATR = 'LOADING_STATR'
export const LOADING_END = 'LOADING_END'
export const CLICK_ACYCN = 'CLICK_ACYCN'
export const ClICK_SYCN ='ClICK_SYCN'



const initialState = {
  count:0,
  list: [],
};
const myContext = React.createContext();

/**
 * 输入旧state 根据 action 返回新 state。这就是 reducer 的作用。
 * @param {*} state   输入的 state
 * @param {*} action  根据action 返回新的 state
 */
function reducer(state, action) {
  switch (action.type) {
    case CLICK_ACYCN:
    case ClICK_SYCN:
      return { ...state, list: action.payload };
    case LOADING_STATR:
      return { ...state, loading: true };
    case LOADING_END:
      return { ...state, loading: false };
    default:
      return state
  }
}

function isPromise(obj) {// 判断异步加载
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

function wrapperDispatch(dispatch) {
  return function(action) {
    if (isPromise(action.payload)) {
      dispatch({ type: LOADING_STATR });
      action.payload.then(v => {
        console.log(action.type)
        let data = v.state === 10001 ?  [] : v.data.content
        dispatch({ type: action.type, payload: data });
        dispatch({ type: LOADING_END });
      });
    } else {
      dispatch(action);
    }
  };
}

/**
 * ContextProvider 
 * 1) 对 myContext 进行了封装。实质上还是提供 context 的功能。
 * 2) 把 state 和 dispatch 提供给所有的 props.children
 * 理解为：给 children 注入了 类似redux reducer 的机制。其实就是
 * 通过 dispatch 一个 action 返回一个新的 state
 * 
 * useReducer
 */
const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <myContext.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>
      {props.children}
    </myContext.Provider>
  );
};

export { reducer, myContext, ContextProvider };