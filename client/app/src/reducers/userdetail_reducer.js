import { LOAD_PROFILE,
        SET_LOCATION_LANG
      } from '../actions/types';

export default function(state = null, action){
  switch(action.type){
      case LOAD_PROFILE:
    return action.payload
  }
  return state;
}
