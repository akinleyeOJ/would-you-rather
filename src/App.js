import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import './App.css';
import { handleInitialData } from "../src/actions/shared";
import LeaderBoard from "./components/LeaderBoard";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Question from "./components/Question";
import NewQuestion from "./components/NewQuestion";
import error from "./components/error";
import QuestionDetail from "./components/QuestionDetail";
import Dashboard from "./components/Dashboard";


class App extends Component {
  
    componentDidMount() {
      const {handleInitialData
    }
    = this.props;
    handleInitialData();
  }

  render() {
    const { authedUser } = this.props;

  return (
    <BrowserRouter>
    <div className="App">
      {authedUser === null ? (
        <Route path="/" component={Login} />
      ) : (
      <Fragment>
         <NavBar/>
         <Dashboard/>
         
         <Route path="/question" component={Question} />
         <Route path="/newquestion" component={NewQuestion} />
         <Route path="/leaderboard" component={LeaderBoard} />
         <Route path="/error" component={error} />
         <Route path="/questions/:question_id" component={QuestionDetail} />
         <Redirect to="/" />
      </Fragment>
      )}
      </div>
    </BrowserRouter>
  );
}
}

const mapStateToProps = state => {
  const { authedUser } = state;
  return { authedUser };
};

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App)
