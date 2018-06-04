// ./src/index.js is the default entry-point for webpack
// In auth2 project, webpack is used to generate the login-page UI
import sayHello from 'say-hello';

import 'assets/index.html';
import 'assets/favicon.png';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('doc ready');
  console.log('loc', location.search);
  console.log('doc loc', document.location.search);
  sayHello()
});
