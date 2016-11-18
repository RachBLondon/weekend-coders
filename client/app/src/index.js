import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import App from './components/app';
import ProfileContainer from './components/Profile/profile_container'
import NoticeBoardContainer from './components/NoticeBoard/noticeboard_container';
import AddProjectContainer from './components/AddProject/add_project_container';
import rootReducer from './reducers';
import DevTools from './components/DevTools';



export default function configureStore(initialState){
  const createStoreWithMiddleWare =  createStore(
        rootReducer,
        initialState,
          compose(
            applyMiddleware(reduxThunk),
            DevTools.instrument())
          )
    return createStoreWithMiddleWare;
  }

  const store = configureStore({});


console.log("window", window, "hows", window.location.hostname)
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={NoticeBoardContainer}/>
          <Route path="search" component={NoticeBoardContainer} />
            <Route path="profile" component={ProfileContainer} />
            <Route path="projects" component={NoticeBoardContainer}/>
            <Route path="addproject" component={AddProjectContainer}/>
        </Route>
      </Router>
    </Provider>
  , document.querySelector('.container'));
