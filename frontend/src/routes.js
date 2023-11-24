const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),

  mainPagePath: () => '/',
  loginPagePath: () => '/login',
  pageNotExistPagePath: () => '/pageNotExist',
};
