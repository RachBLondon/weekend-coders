import {
    ADD_NAME_TO_STATE
} from '../actions/types';

export default function (state = null, action) {
    switch (action.type){
        case ADD_NAME_TO_STATE:
           return action.name;
    }
    return state;
}
