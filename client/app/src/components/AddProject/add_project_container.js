import React, {Component} from 'react';
import { connect } from 'react-redux'
import AddProject from './AddProject'

class AddProjectContainer extends Component {
    render() {
        return ( <div>
                    <AddProject />
                </div>)
        }
}

function mapStateToProps(state){
    return {
        state : state
    }
}

export default connect(mapStateToProps) (AddProjectContainer)