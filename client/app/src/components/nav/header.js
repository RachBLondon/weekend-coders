import React, { Component } from 'react'
import {Link} from 'react-router'

class Header extends Component {
    render(){
        return (
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <li className="nav-item"><Link to="logout">Sign Out</Link></li>
                    <li className="nav-item"><Link to="profile">Profile</Link></li>
                    <li className="nav-item"><Link to="shortlist">Shortlist</Link></li>
                    <li className="nav-item"><Link to="search">Search</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Header