import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import userDetailReducer from './userdetail_reducer'
import langLoc from './location_lang_reducer'


const rootReducer = combineReducers({
  form,
  langLoc,
  usersDetails : userDetailReducer
  });

export default rootReducer;
