import React, {Component} from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import {getProfile} from './../../actions'

class profileContainer extends Component {
    componentWillMount(){
        if(!this.props.profile){
            this.props.getProfile()
        }
    }

    render() {
        return ( <div>
                <Profile
                    profile={this.props.profile}

                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
      profile : state.profile
    }
}

export default connect(mapStateToProps, {getProfile}) (profileContainer)