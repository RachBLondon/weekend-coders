import React, {Component} from 'react';
import { connect } from 'react-redux';
import AddProject from './AddProject';

import {  addNameToState,
          submitProject
        } from './../../actions';

class AddProjectContainer extends Component {

    handleSubmit(){
        // console.log("in handleS", this.props);
        this.props.submitProject(this.props.state.newProject);
    }

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
                    <AddProject
                        inputs={inputs}
                        submitClick={this.handleSubmit.bind(this)}
                     />
                </div>)
        }
}

function mapStateToProps(state){
    return {
        state : state
    }
}

export default connect(mapStateToProps,
        { addNameToState,
          submitProject}
        ) (AddProjectContainer)
