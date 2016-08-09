import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import userDetailReducer from './userdetail_reducer'
import langLoc from './location_lang_reducer'
import shortlist from './shortlist_reducer'
import profile from './profile_reducer'


const rootReducer = combineReducers({
  form,
  langLoc,
  shortlist,
  profile,
  usersDetails : userDetailReducer
  })

export default rootReducer
