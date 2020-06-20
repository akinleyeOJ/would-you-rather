import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAuthedUser} from '../actions/authedUser';

export class Logout extends Component {
    componentDidMount() {
        this.props.setAuthedUser(null);
    }

    render() {
        return <div></div>
    }
}

export default connect(null, { setAuthedUser })(Logout);