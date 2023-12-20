import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import io from 'socket.io-client';
import { actionsMessages } from './slices/messagesSlice.js';
import { actionsChannels } from './slices/channelsSlice.js';
import App from './App';
import resources from './locales/index.js';
import store from './slices/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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

  const socket = io();

  await new Promise((resolve, reject) => {
    socket.on('connect', resolve);
    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect();
      }, 1000);
      reject(new Error('Connection Error'));
    });
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(actionsChannels.addChannel({ channel }));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(actionsChannels.renameChannel({ channel }));
  });
  socket.on('removeChannel', (channel) => {
    store.dispatch(actionsChannels.removeChannel({ channel }));
  });
  socket.on('newMessage', (message) => {
    store.dispatch(actionsMessages.addMessage({ message }));
  });

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <I18nextProvider i18n={i18n}>
            <App socket={socket} />
          </I18nextProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
