import React from 'react'
import { Component } from 'react'
import Header from './nav/header'
import DevTools from './DevTools'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        { this.props.children }
        <DevTools />
      </div>
    )
  }
}
