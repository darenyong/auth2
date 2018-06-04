function createMsg(msg) {
  const element = document.createElement('div');
  element.innerHTML = msg;
  return element;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sayHello = async () => {
  await sleep(2000);
  const login = 'https://darenyong.com/auth/login' + location.search;
  document.body.appendChild(createMsg('submitting login form... ' + login));
  await sleep(3000);
  window.location.href = 'https://darenyong.com/auth/login' + location.search;
};

module.exports = sayHello;