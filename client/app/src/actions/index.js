import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    LOAD_PROFILE,
    LOAD_PROJECTS,
    ADD_NAME_TO_STATE
} from './types'
import {ROOT_URL} from './../constants/host_url'



export function getProjects(){
    console.log('in get projects')

    return function(dispatch){
        axios.get('/getprojects')
            .then(response =>{
                dispatch({
                    type: LOAD_PROJECTS,
                    projects : response.data
                });
                console.log(response);
            });
    }
}

export function getProfile(){
    return function(dispatch){
        axios.get('/getprofile')
            .then(response =>{
                dispatch({
                    type: LOAD_PROFILE,
                    payload : response.data
                });

                console.log(response)
            });
    }
}

export function addNameToState(name){
  console.log("in action", name);
    return function(dispatch){
      dispatch({
        type : ADD_NAME_TO_STATE,
        name : name
      });
    }
}
