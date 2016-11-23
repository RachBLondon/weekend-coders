import { combineReducers } from 'redux';
import profile from './profile_reducer';
import projects from './projects_reducer';
import newProject from './new_project_reducer';


const rootReducer = combineReducers({
    profile,
    newProject,
    projects})

export default rootReducer
