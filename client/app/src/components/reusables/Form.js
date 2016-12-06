import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Form extends Component {


    renderInputs(){

        return this.props.inputs.map((input, i) => {
            return (
            <div key={i} className="input-group">
                <span className="input-group-addon" id={input.field + '_id'}>{input.field}</span>
                <input ref="name1" type="text" className="form-control" placeholder={input.placeholder} onChange={input.handleChange}/>
            </div>
            )
        });
    }

    render(){
      console.log("jahfjdh", this.props)
        return (
            <div>
                {this.renderInputs()}
                <button className="btn btn-default" onClick={this.props.submitClick}>Submit</button>
            </div>
        )
    }
}
