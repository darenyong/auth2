// index.js is the default webpack entry point

import React from 'react';
import ReactDOM from 'react-dom';
import Login from 'components/login'

import 'assets/index.html';
import 'assets/favicon.png';
import 'assets/pool.jpg';
import 'styles/app.scss';

const render = () =>
  ReactDOM.render(
    <Login/>,
    document.getElementById('root'),
  );

render(Login);
