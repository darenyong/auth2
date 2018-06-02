import _ from 'lodash';
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// needed to sign JWT
const secretKey = fs.readFileSync(path.join(__dirname, '..', '..', 'secret-key'), 'utf-8');

const cookieName = 'daren-auth-token';

const setCookie = (res, token) => {
  const secure = false;
  const maxAge = 60000;
  const httpOnly = false;
  res.cookie(cookieName, token, { secure, maxAge, httpOnly });
};

const createLoginUrl = () => 'http://localhost:8080/login';

router.get('/login', function (req, res, next) {
  res.json({msg: 'login page goes here'});
});

// home page - all auth requests land here
router.get('/', function (req, res, next) {
  try {
    const proto = req.get('x-forwarded-proto'); // http
    const host = req.get('x-forwarded-host');   // localhost:8080
    const dest = req.get('x-forwarded-uri');    // '/'

    if (_.isString(dest) && dest.startsWith('/auth')) {
      res.send('ok'); // bypass security for any request to /auth/...
      return;
    }

    const cookie = req.cookies[cookieName];
    log.info(`lg msg cookie is '${cookie}'`);

    if (cookie) { // validate the cookie
      const expired = false;
      if (expired) {
        // TODO: renew
      }
      // TODO: verify cookie
      const validCookie = true;
      if (validCookie) {
        log.info('cookie present and ok, auth success');
        res.send('cookie present and ok, auth success');
        return;
      }
    }

    log.info('no cookie or invalid cookie, force login');
    res.redirect(createLoginUrl());

  } catch (err) {
    log.error(`error checking for cookie ${err.stack}`);
    res.status(500);
    res.send('error checking for cookie');
  }
});

module.exports = router;
