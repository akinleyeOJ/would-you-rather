import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import './App.css';
import { handleInitialData } from "../src/actions/shared";
import LeaderBoard from "./components/LeaderBoard";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Question from "./components/Question";
import NewQuestion from "./components/NewQuestion";
import error from "./components/error";
import QuestionDetail from "./components/QuestionDetail";
import Dashboard from "./components/Dashboard";
import RequiresAuth from './components/RequiresAuth'

class App extends Component {
  state= {activeIndex: 0}
    componentDidMount() {
      const {handleInitialData
    }
    = this.props;
    handleInitialData();
  }

  handleTabChange = (e, { activeIndex }) => {
    this.setState({activeIndex});
  }

  resetActiveIndexToZero = () => { this.setState({ activeIndex: 0});
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
       
         <Dashboard/>
         <div className="ui main text container" style={{marginTop: "80px"}}>
         <Switch>
         <Route path="/" exact render={() => {
           return( 
           <Question
            handleTabChange={this.handleTabChange}
            activeIndex={this.state.activeIndex}
            />
           );
         }}
         />
          <Route
                path="/add"
                render={history => {
                  return (
                    <NewQuestion
                      resetActiveIndexToZero={this.resetActiveIndexToZero}
                      history={history.history}
                    />
                  );
                }}
              />
         <Route path="/logout" component={Logout}/>
         <Route path="/leaderboard" component={LeaderBoard} />
         <Route path="/error404" component={error} />
         <Route path="/" component={error} />
         <Route path="/questions/:question_id" component={RequiresAuth(QuestionDetail)} />
         
         </Switch>
         </div>
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
