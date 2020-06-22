import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

function error(props) {
        return (
            <div>
            <div>
               <h3 className="center">404/ Page not found</h3>
            </div>
            <div>
                <button onClick={() => props.history.push('/')}>
                Go back Home
                </button>
            </div>
            </div>
        )
    }


export default withRouter(error)
