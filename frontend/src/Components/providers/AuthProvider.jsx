import React, { useState, useMemo } from 'react';
import { AuthContext } from '../../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const username = JSON.parse(localStorage.getItem('user'));
  const [currentUser, setCurrentUser] = useState(username || null);

  const authHeader = useMemo(() => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  }, [currentUser]);

  const logIn = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const authValue = useMemo(
    () => ({
      authHeader,
      currentUser,
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
