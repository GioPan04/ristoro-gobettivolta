# How login works

## The login flow

1.  The client calls `https://{SERVER_DOMAIN}/api/auth/login`
2.  The server redirect the client into the Google Accounts OAuth login prompt and will force the user to use an account that has the subdomain of the email `gobettivolta.edu.it`.
3.  Once the login is completed, google will redirect the user to `https://{SERVER_DOMAIN}/api/auth/googlecallback`, and with that the code as url parameter.
4.  The code will be sent from the server to Google APIs to get the access token and other data.
5.  The server will generate and sign a jwt token with userdata and send it to the client redirecting the client to `ristorogv://login?code=xxx`