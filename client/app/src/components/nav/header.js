import React, { Component } from 'react'
import {Link} from 'react-router'
import {logOut} from './../../actions'
import { connect } from 'react-redux'

class Header extends Component {
    render(){
        return (
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <li className="nav-item"><a href="http://localhost:5000/logout"> Sign Out</a></li>
                    <li className="nav-item"><Link to="profile">Profile</Link></li>
                    <li className="nav-item"><Link to="shortlist">Shortlist</Link></li>
                    <li className="nav-item"><Link to="search">Search</Link></li>
                    <li className="nav-item"><Link to="projects">Projects</Link></li>
                    <li className="nav-item"><Link to="addproject">Add Project</Link></li>
                </ul>
            </nav>
        )
    }
}

export default connect(null, {logOut})(Header)