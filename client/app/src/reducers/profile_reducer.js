import { LOAD_PROFILE,
} from '../actions/types';

export default function(state = null, action){
    switch(action.type){
        case LOAD_PROFILE:
            return action.payload
    }
    return state;
}
