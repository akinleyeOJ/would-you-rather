import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Dashboard extends Component {
  render() {
    return (
      
      <div className="ui fixed inverted menu green">
     <div className="ui container " >
         
      <NavLink to="/"
            exact
            className="header item"
            activeClassName="active" > Home </NavLink>
          
          <NavLink to="/newpoll"
            exact
            className="item"
            activeClassName="active" > New Poll </NavLink>
         
          <NavLink to="/leaderboard"
            exact
            className="item"
            activeClassName="active" > Leader Board </NavLink>
          
          <NavLink to="/login"
            exact
            className="ui right floated item"
            activeClassName="active" > Login </NavLink>
        </div>
      </div>
    );
  }
}

export default Dashboard;

