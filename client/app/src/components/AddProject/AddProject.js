import React, {Component} from 'react';
import Form from './../reusables/Form';
export default class AddProject extends Component {
    render(){
        return (<div>
                    <h1> Add Project </h1>
                    <Form inputs={this.props.inputs}/>
                </div>)
    }
}