import {
    LOAD_PROJECTS
} from '../actions/types';

export default function (state = null, action) {
    switch (action.type){
        case LOAD_PROJECTS:
           return action.projects;
    }
    return state;
}
