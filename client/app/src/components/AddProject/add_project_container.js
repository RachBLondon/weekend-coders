import React, {Component} from 'react';
import { connect } from 'react-redux'
import AddProject from './AddProject'

class AddProjectContainer extends Component {


    render() {
        const inputs = [
            {
                field : 'Name',
                placeholder : 'Rachel'
            }
        ]

        return ( <div>
                    <AddProject inputs={inputs} />
                </div>)
        }
}

function mapStateToProps(state){
    return {
        state : state
    }
}

export default connect(mapStateToProps) (AddProjectContainer)