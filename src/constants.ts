export const AUTH = {
  audience: 'https://dev-h4l3tn-y.us.auth0.com/api/v2/',
  domain: 'dev-h4l3tn-y.us.auth0.com',
  redirectUri:
    process.env.NODE_ENV === 'production' ? 'https://przelejmi.pl/' : 'http://localhost:3000',
}
