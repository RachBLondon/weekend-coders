import React, { Component } from 'react';
import * as actions from '../../actions'
import { connect } from 'react-redux';

class UserCard extends Component {
    handleClick(userName){
        this.props.addToShortList(userName)
    }

    render(){
        // console.log(this.props)
        return(<div>
            <div  className="col-md-4  c-user_cell" style={this.props.divStyle}>
                <div className="row">
                    <div className="col-xs-6">
                        <img src={this.props.avatar} className="c-user_cell__img" />
                        <h4>{this.props.userName}</h4>
                        <p>{this.props.location}</p>
                        <p>Hireable: <i className={this.props.hireStatus}></i> </p>
                    </div>
                    <div className="col-xs-6">
                        <p>Follwers : {this.props.followers}</p>
                        <p>Repos : {this.props.repos}</p>
                        <button onClick={this.handleClick.bind( this, this.props.userName)} className="btn btn-default" type="submit">Add to short list</button>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default UserCard