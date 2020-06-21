import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import {connect} from "react-redux"

export class Dashboard extends Component {
  render() {
    const {users, authedUser } = this.props;
    const {name, avatarURL } = users[authedUser];    
    return (
      
      <div className="ui fixed inverted menu red">
     <div className="ui container " >
         
      <NavLink to="/"
            exact
            className="header item"
            activeClassName="active" > Home </NavLink>
          
          <NavLink to="/newQuestion"
            exact
            className="item"
            activeClassName="active" > New Poll </NavLink>
         
          <NavLink to="/leaderboard"
            exact
            className="item"
            activeClassName="active" > Leader Board </NavLink>
          <div className="ui right floated item">
            Hi, {name}
          <img className="ui avatar image" src={avatarURL} alt=""></img>
           </div>
          <NavLink to="/logout"
            exact
            className="ui right floated item"
             > Logout </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return  {authedUser: state.authedUser, users: state.users};
}

export default connect(mapStateToProps)(Dashboard);

