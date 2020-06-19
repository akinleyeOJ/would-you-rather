import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Dropdown} from "semantic-ui-react";
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    userSelected: 'select',
    toHome: false,
  }
  referrer = null;

  componentDidMount() {
    const {
      history,
      location: { pathname }
    } = this.props;
    this.referrer = pathname;
    history.push("/login");
  }

  handleUserSelection = (event, data) => {
    this.setState({ userSelected: data.value });
  };

  handleUserLogin = () => {
    const { history } = this.props;
    if (!this.state.userSelected) {
      this.setState({
        message: {
          hidden: false,
          content: "Please select a user"
        }
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: ""
        }
      });
    }

    this.props.setAuthedUser(this.state.userSelected);
    if ( this.referrer === "/login") {
      history.push("/");
    } else {
      history.push(this.referrer);
    }
  };

  render() {
  const {users} = this.props;
  if(!users) {
  return;  
}
    
    const userOptions = Object.keys(users).map(userId => ({
        key: userId,
        value: userId,
        text: users[userId].name,
        image: { avatar: true, src: users[userId].avatarURL }
      }));
  
      return (
        <div>
        <div className="ui container">
          <div className="ui middle  aligned center aligned grid">
            <div className="column" style={{ width: "450px", marginTop: "5em" }}>
              <h2 className="ui image header green">
                <div className="content">Please Sign In To Proceed</div>
              </h2>
              <form className="ui large form">
                <div className="ui raised segment">
                  <div className="field">
                    <Dropdown
                      placeholder="Select Friend"
                      fluid
                      selection
                      scrolling
                      options={userOptions}
                      onChange={this.handleUserSelection}
                    />
                  </div>
                  <div className="ui fluid green submit button"
                    onClick={this.handleUserLogin} > Login
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
    
      );
    }
  }
  const mapStateToProps = ({ users }) => {
    return { users };
  };
  
  export default connect( mapStateToProps, { setAuthedUser })(Login);