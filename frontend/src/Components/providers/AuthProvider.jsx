import React, { useState, useMemo, useCallback } from 'react';
import { AuthContext } from '../../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true',
  );

  const getUsername = useCallback(() => {
    const { username } = JSON.parse(localStorage.getItem('user'));
    return username;
  }, []);

  const logIn = (username) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(username));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const authValue = useMemo(
    () => ({
      getUsername,
      loggedIn,
      logIn,
      logOut,
    }),
    [loggedIn, getUsername],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
