import React, {Component} from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import {getProfile} from './../../actions'

class profileContainer extends Component {
    componentWillMount(){
        if(!this.props.userprofile){
            console.log('get usersprofile')
            this.props.getProfile()
        }
    }

    render() {
        return ( <div>
                <Profile/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
      userprofile : state.profile
    }
}

export default connect(mapStateToProps, {getProfile}) (profileContainer)