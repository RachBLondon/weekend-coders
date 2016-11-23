import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Form extends Component {


    // handleChange(){
    //   console.log(this.props)
    //   const name = ReactDOM.findDOMNode(this.refs.name1).value;
    //   this.props.handleChange(name);
    // }

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
        return (
            <div>
                {this.renderInputs()}
            </div>
        )
    }
}
