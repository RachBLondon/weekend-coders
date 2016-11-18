import React, {Component} from 'react';

export default class Form extends Component {
    renderInputs(){
        return this.props.inputs.map(input => {
            return (
                <div className="input-group">
                <span className="input-group-addon" id={input.field + '_id'}>{input.field}</span>
            <input type="text" className="form-control" placeholder={input.placeholder}/>
            </div>
            )
        });
    }

    render(){
        return (
            <div>
                {this.renderInputs()}
            </div>
        )
    }
}