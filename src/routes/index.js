import _ from 'lodash';
import express from 'express';
import fs from 'fs';
import path from 'path';
import querystring from 'querystring';

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

const createLoginUrl = (database) => `http://localhost:8080/login?database=${database}`;

router.get('/login', function (req, res, next) {
  const queryPart = req.originalUrl.substring(req.originalUrl.indexOf('?') + 1);
  const parsed = querystring.parse(queryPart);

  console.log('login database', parsed.database);

  // TODO: connect to mongo, check if db exists, check user & password, set-cookie with signed JWT with roles

  res.json({msg: 'login page goes here'});
});

// home page - all auth requests land here
router.get('/', function (req, res, next) {
  try {
    const proto = req.get('x-forwarded-proto'); // http
    const host = req.get('x-forwarded-host');   // localhost:8080
    const dest = req.get('x-forwarded-uri');    // '/'

    console.log('x-forwarded-uri', dest);

    if (!dest || _.isString(dest) && (dest === '/' || dest.startsWith('/auth'))) {
      res.send('bypass'); // bypass security for any request to /auth...
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
    const database = dest.split('/')[1];
    res.redirect(createLoginUrl(database));

  } catch (err) {
    log.error(`error checking for cookie ${err.stack}`);
    res.status(500);
    res.send('error checking for cookie');
  }
});

module.exports = router;
