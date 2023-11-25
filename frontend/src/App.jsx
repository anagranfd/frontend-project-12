import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Page404 } from './Components/Page404';
import { MainPage } from './Components/MainPage';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const MainRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  console.log(auth.loggedIn);
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <MainRoute>
                  {/* <h1 className="text-center mt-5 mb-4">
                    Welcome to the main page!
                  </h1> */}
                  <MainPage />
                </MainRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
