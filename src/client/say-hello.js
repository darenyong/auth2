import _ from 'lodash';
import queryString from 'qs';

function createMsg(msg) {
  const element = document.createElement('div');
  element.innerHTML = msg;
  return element;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sayHello = async () => {
  await sleep(2000);
  document.body.appendChild(createMsg(_.join(['Hello', 'webpack'], ' ')));
  const obj = queryString.parse(location.search, { ignoreQueryPrefix: true });
  console.log('obj', obj);
  document.body.appendChild(createMsg(obj.app));
  document.body.appendChild(createMsg(obj.redirect));
};

module.exports = sayHello;