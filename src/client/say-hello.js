import _ from "lodash";

function createHelloMsg() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sayHello = async () => {
  await sleep(2000);
  document.body.appendChild(createHelloMsg());
};

module.exports = sayHello;