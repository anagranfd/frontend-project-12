import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const AppWithProviders = await init();

  root.render(<React.StrictMode>{AppWithProviders}</React.StrictMode>);
};

app();
