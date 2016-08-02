import axios from 'axios';
import { browserHistory } from 'react-router';
import { SHOW_USER_DATA,
        SET_LOCATION_LANG
        } from './types';

const ROOT_URL = 'http://localhost:3090';



//TODO rename this function
export function fetchGithubMessage({location, language}){
  return function(dispatch){
        dispatch({
          type :SET_LOCATION_LANG,
          location,
          language
        })
        axios.get(ROOT_URL + '/github/test',
        { headers: { authorization: localStorage.getItem('token'),location :location, language: language}
      }).then(response => {
        const pagination = response.data.shift()
        //TODO Write a test for this
          const lastPage = pagination.links.last.split('page=')[1];
            dispatch({
               type: SHOW_USER_DATA,
               pagination : pagination,
               payload : response.data,
               lastPage : lastPage
             });

      }).catch(function (response) {
        console.log(response);
      });
   }
}

export function fetchPagination(data){
  return function(dispatch){
    axios.get(ROOT_URL + '/github/pagination',{headers: {url: data.url}
      }).then(response => {
        console.log(response);
        dispatch ({
           type: SHOW_USER_DATA,
           pagination : response.data.shift(),
           payload : response.data
         })
       }).catch(function (response) {
         console.log(response);
    });
  }
}
