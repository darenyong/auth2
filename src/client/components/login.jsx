import _ from 'lodash';
import queryString from 'qs';
import React, { Component } from 'react';

class Login extends Component {

  constructor(props) {
    super(props);
    _.bindAll(this, 'onSubmit');
  }

  onSubmit() {
    alert('you clicked login');
  }

  render() {
    const query = queryString.parse(location.search, { ignoreQueryPrefix: true });
    return (
      <div>
        <h1>React Login Page</h1>
        <div><span style={{ bold: true, paddingRight: '1rem' }}>App:</span>{query.app}</div>
        <div><span style={{ bold: true, paddingRight: '1rem' }}>Redirect:</span>{query.redirect}</div>
        <button onClick={this.onSubmit}>Login</button>
      </div>
    );
  }
}

export default Login;