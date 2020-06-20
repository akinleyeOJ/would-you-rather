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
    history.push("/login");
  }
  state = {
    value: ''
  };

  onChange = (e, { value }) => {this.setState({ value });};

   handleSubmit = e => {
    e.preventDefault();
    const { setAuthedUser } = this.props;
    const authedUser = this.state.value;

    new Promise((res, rej) => {
     
      setTimeout(() => res(), 500);
    }).then(() => setAuthedUser(authedUser));
  };


  render() {
  const {users} = this.props;
  const { value } = this.state;
  const disabled = value === '' ? true : false;
 
    
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
                <div className="content">Please Login In To Proceed</div>
              </h2>
              <form onSubmit={this.handleSubmit} className="ui large form">
                <div className="ui raised segment">
                  <div className="field">
                    <Dropdown
                      placeholder="Select Friend"
                      fluid
                      selection
                      scrolling
                      options={userOptions}
                      onChange={this.onChange}
                    />
                  </div>
                  <Form.Button content="Login" disabled={disabled} fluid />
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