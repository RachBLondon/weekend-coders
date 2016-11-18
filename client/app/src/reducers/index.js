import { combineReducers } from 'redux';
import profile from './profile_reducer';
import projects from './projects_reducer';


const rootReducer = combineReducers({
    profile,
    projects})

export default rootReducer
