import {
        SET_LOCATION_LANG,
        SHOW_USER_DATA
      } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
      case SET_LOCATION_LANG:
  return {...state, location : action.location, language: action.language}
      case SHOW_USER_DATA:
  return {...state, pagination: action.pagination}
    }
  return state;
}
