import React, {Component} from 'react';
import { connect } from 'react-redux';
import AddProject from './AddProject';
import {addNameToState} from './../../actions';

class AddProjectContainer extends Component {


    render() {
        const inputs = [
            {
                field : 'Name',
                placeholder : 'Rachel',
                handleChange : (event)=>{
                  this.props.addNameToState(event.target.value);
                }

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

export default connect(mapStateToProps, {addNameToState}) (AddProjectContainer)
