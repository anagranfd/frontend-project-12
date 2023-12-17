import React, { useState, useMemo } from 'react';
import { AuthContext } from '../../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  // const [loggedIn, setLoggedIn] = useState(
  //   localStorage.getItem('isLoggedIn') === 'true',
  // );
  const username = JSON.parse(localStorage.getItem('user'));
  const [currentUser, setCurrentUser] = useState(username || null);

  const authHeader = useMemo(() => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  }, [currentUser]);

  const logIn = (user) => {
    // localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    // setLoggedIn(true);
    setCurrentUser(user);
  };

  const logOut = () => {
    // localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    // setLoggedIn(false);
    setCurrentUser(null);
  };

  const authValue = useMemo(
    () => ({
      authHeader,
      currentUser,
      // loggedIn,
      logIn,
      logOut,
    }),
    [authHeader, currentUser],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
