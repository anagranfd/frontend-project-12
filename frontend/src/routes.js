const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),

  mainPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  pageNotExistPagePath: () => '/pageNotExist',
};
