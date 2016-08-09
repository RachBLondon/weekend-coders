import React, {Component} from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'

class profileContainer extends Component {

    render() {
        return ( <div>
                <Profile/>
            </div>
        )
    }
}
export default connect(null, {}) (profileContainer)