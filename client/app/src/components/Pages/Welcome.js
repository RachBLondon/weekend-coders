import React, { Component } from 'react'
import {Link} from 'react-router'

class Welcome extends Component {
    render(){
        return (<div>
            <h1>Welcome to the App</h1>
            <h2><Link to='/search'>Start searching now!</Link></h2>
        </div>)
    }
}

export default Welcome