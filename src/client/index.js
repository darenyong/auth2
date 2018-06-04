// ./src/index.js is the default entry-point for webpack
// In auth2 project, webpack is used to generate the login-page UI

import _ from 'lodash';
import queryString from 'qs';
import sayHello from 'say-hello';
import 'assets/index.html';
import 'assets/favicon.png';

function createMsg(msg) {
  const element = document.createElement('div');
  element.innerHTML = msg;
  return element;
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('doc ready');
  console.log('loc', location.search);
  console.log('doc loc', document.location.search);

  const obj = queryString.parse(location.search, { ignoreQueryPrefix: true });
  console.log('obj', obj);
  document.body.appendChild(createMsg(_.join(['Hello', 'webpack'], ' ')));
  document.body.appendChild(createMsg(obj.app));
  document.body.appendChild(createMsg(obj.redirect));

  sayHello()
});
