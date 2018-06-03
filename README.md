# Auth2

Simple project to experiment with an auth micro-service,
so that authentication is (mostly) abstracted away from api.

Backend api will need to verify token, check user role.

#### Generating keys

Run ssh-keygen, it will prompt for output file name
> ssh-keygen

Convert public key to pem format
> ssh-keygen -f /path/to/public.pub -e -m pem > /path/to/public.pem

## Warning

When an app relies on Auth service, it should make sure
the user has already successfully logged in before attempting
operations that modify data on the server (POST/DELETE).

User Agents may change the method to a GET on redirect
according to HTTP spec, [section 9.3](https://www.w3.org/Protocols/HTTP/1.0/draft-ietf-http-spec.html):

> If the 302 status code is received in response to a request using the POST method, the user agent must not automatically redirect the request unless it can be confirmed by the user, since this might change the conditions under which the request was issued.
>
> Note: When automatically redirecting a POST request after receiving a 302 status code, some existing user agents will erroneously change it into a GET request.

## Hardening

* Investigate XSS (scrub inputs, Http-Only, CSP policies) [guide](https://excess-xss.com/)
* Investigate methods for anti-CSRF [discussion](https://security.stackexchange.com/questions/177300/what-happens-if-my-anti-csrf-token-is-compromised-by-an-xss-attack?rq=1)
