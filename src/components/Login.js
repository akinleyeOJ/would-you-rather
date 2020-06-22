import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Dropdown, Form} from "semantic-ui-react";
import { setAuthedUser } from '../actions/authedUser'


class Login extends Component {
  state = {
    userSelected: 'select',
    toHome: false,
    message: {hidden: true, content: ""}
  };
  referrer = null;
 
  componentDidMount() {
    const {
      history,
      location: { pathname }
    } = this.props;
    this.referrer = pathname;
    history.push("/");
  }
  state = {
    value: ''
  };

  handleUserSelection = (event, data) => {
    this.setState({ selectedUser: data.value });
  };

  handleUserLogin = () => {
    const { history } = this.props;
    if (!this.state.selectedUser) {
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

    this.props.setAuthedUser(this.state.selectedUser);
    if (this.referrer === "/logout" || this.referrer === "/login") {
      history.push("/");
    } else {
      history.push(this.referrer);
    }
  };

  render() {
    const { users } = this.props;
    if (!users) {
      return;
    }

    const userOptions = Object.keys(users).map(userId => ({
      key: userId,
      value: userId,
      text: users[userId].name,
      image: { avatar: true, src: users[userId].avatarURL }
    }));

    const { message } = this.state;
      return (
        <div>
        <div className="ui container">
          <div className="ui middle  aligned center aligned grid">
            <div className="column" style={{ width: "450px", marginTop: "5em" }}>
              <h2 className="ui image header red">
                <div className="content">Please Login In To Proceed</div>
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
                  <Form.Button onClick={this.handleUserLogin} content="Login" negative fluid />
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