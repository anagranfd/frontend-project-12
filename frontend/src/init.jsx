import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import resources from './locales/index.js';
import store from './slices/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import './index.css';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
