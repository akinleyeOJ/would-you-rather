import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {connect} from "react-redux";
import './App.css';

import LeaderBoard from "./components/LeaderBoard";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Question from "./components/Question";
import NewQuestion from "./components/NewQuestion";
import error from "./components/error";
import QuestionDetail from "./components/QuestionDetail";
import Dashboard from "./components/Dashboard";

class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <Fragment>
         <NavBar/>
         <Dashboard/>
         <Route path="/login" component={Login} /> 
         <Route path="/question" component={Question} />
         <Route path="/newquestion" component={NewQuestion} />
         <Route path="/leaderboard" component={LeaderBoard} />
         <Route path="/error" component={error} />
         <Route path="/questions/:question_id" component={QuestionDetail} />
      </Fragment>
    </BrowserRouter>
  );
}
}

export default App;
