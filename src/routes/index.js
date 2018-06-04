import _ from 'lodash';
import express from 'express';
import fs from 'fs';
import path from 'path';
import querystring from 'querystring';

const router = express.Router();

// needed to sign JWT
const keys = {
  private: fs.readFileSync(path.join(__dirname, '..', '..', 'private.pem'), 'utf-8'),
  public: fs.readFileSync(path.join(__dirname, '..', '..', 'public.pem'), 'utf-8')
};

const cookieName = 'daren-auth-token';
const cookieDomain = '.darenyong.com';

const setCookie = (res, token) => {
  const secure = false;
  const maxAge = 60000;
  const httpOnly = false;
  res.cookie(cookieName, token, { /* cookieDomain, */ secure, maxAge, httpOnly });
};

const createRedirectUrl = (proto, host, url) => encodeURIComponent(`${proto}://${host}${url}`);
const createLoginUrl = (proto, host, app, redirect) => `${proto}://${host}/auth/login?app=${app}&redirect=${redirect}`;


router.get('/auth/login', function (req, res, next) {
  const queryPart = req.originalUrl.substring(req.originalUrl.indexOf('?') + 1);
  const parsed = querystring.parse(queryPart);

  console.log('login database', parsed.app);
  console.log('redirect target', decodeURIComponent(parsed.redirect));

  // TODO: connect to mongo, check if db exists, check user & password, set-cookie with signed JWT with roles

  res.send('login');
});

// home page - all auth requests land here.  WARNING: /auth prefix is stripped from x-forwarded-uri
router.get('/', function (req, res, next) {
  try {
    const proto = req.get('x-forwarded-proto'); // http
    const host = req.get('x-forwarded-host');   // localhost:8080
    const dest = req.get('x-forwarded-uri');    // '/'

    log.warn(`dest ${dest}`);

    if (!dest || _.isString(dest) && (dest === '/' || dest.startsWith('/auth'))) {
      log.info(`bypass security for url ${dest}`);
      // res.status(200);
      res.send('ok'); // bypass security for any request to /auth...
      return;
    }

    const cookie = req.cookies[cookieName];
    if (cookie) { // validate the cookie
      // TODO: verify cookie
      const validCookie = true;
      if (validCookie) {

        const expired = false;
        if (expired) {
          // TODO: renew
        }

        log.info('auth success');
        res.send('auth success');
        return;
      }
    }

    log.info('no cookie or invalid cookie, force login');
    const app = _.defaultTo(dest, '').split('/')[1];
    const url = createLoginUrl(proto, host, app, createRedirectUrl(proto, host, dest));
    log.debug(`login-page url ${url}`);
    res.redirect(url);

  } catch (err) {
    log.error(`error checking for cookie ${err.stack}`);
    res.status(500);
    res.send('error checking for cookie');
  }
});

module.exports = router;
