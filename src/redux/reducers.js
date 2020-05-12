
import { combineReducers } from 'redux'
import { breadcrumbReducer } from './modules/breadcrumb'


export default combineReducers({
  breadcrumb: breadcrumbReducer
})