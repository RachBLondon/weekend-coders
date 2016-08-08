import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import reduxThunk from 'redux-thunk'
import { AUTH_USER } from './actions/types'

import App from './components/app'
import GitHub from './components/GitHub/GitHub'
import ShortList from './components/shortlist/ShortList'
import Profile from './components/profile/Profile'
import rootReducer from './reducers'
import DevTools from './components/DevTools'



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



  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={GitHub}/>
          <Route path="search" component={GitHub} />
            <Route path="shortlist" component={ShortList} />
            <Route path="profile" component={Profile} />
        </Route>
      </Router>
    </Provider>
  , document.querySelector('.container'));
