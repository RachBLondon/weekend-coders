
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as actions from '../../actions'

import UserCard from './UserCard'
import Pager from '../nav/pager'



let numberUsersDisplayed = 0;

const colorScheme =['#ffffff', '#998a7b','#d7e6ef', '#bfced3', '#aca497']

class GitHub extends Component {

  handleFormSubmit({ language, location}){
    this.props.fetchGithubMessage({language, location});
  }

  pagingation(){
    return this.props.usersDetails.length === 30 ? <Pager pagination={actions.fetchPagination} paginationCall={this.props.fetchPagination} pages={this.props.pagination.links} /> : null;
  }

  showUsers(){
   let count = 0;
   return this.props.usersDetails.map(user =>{
      const userName = user.name ? user.name : user.login;
      const hireStatus = user.hireable? "fa fa-check-circle": "fa fa-times";
      const textColor = count%5 === 1 || count%5 === 4 ? '#ffffff' : '#998a7b';
      const divStyle = {backgroundColor : colorScheme[count%5], color : textColor}
      count ++;

        return (
                  <UserCard
                    key={count}
                    userName={userName}
                    hireStatus={hireStatus}
                    textColor={textColor}
                    divStyle={divStyle}
                    avatar={user.avatar_url}
                    location={user.location}
                    followers={user.followers}
                    repos={user.public_repos}
                  />
                )
          });
      }

  render() {

    const { handleSubmit , fields :{ language, location }} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label> language: </label>
          <input { ...language } className="form-control" />
        </fieldset>

        <fieldset className="form-group">
          <label> Location: </label>
          <input { ...location } className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in </button>
        </form>
          {this.pagingation()}
        <div className="row">
            {this.showUsers()}
        </div>
          {this.pagingation()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersDetails : state.usersDetails,
    pagination   : state.langLoc.pagination
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
      fetchGithubMessage : ({language, location }) => {
      dispatch(actions.fetchGithubMessage({language, location}) )
    },
    fetchPagination : (url)=>{
      dispatch(actions.fetchPagination(url))
    }

  }
}





export default reduxForm({
  form: 'search',
  fields: ['language', 'location']
}, mapStateToProps, mapDispatchToProps)(GitHub);
