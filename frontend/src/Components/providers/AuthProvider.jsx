import React, { useState, useMemo } from 'react';
import { AuthContext } from '../../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true',
  );

  const logIn = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const authValue = useMemo(
    () => ({
      loggedIn,
      logIn,
      logOut,
    }),
    [loggedIn],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
