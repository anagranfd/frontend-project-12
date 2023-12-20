import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useAuth from './hooks/index.jsx';
import AuthProvider from './Components/providers/AuthProvider.jsx';
import ApiProvider from './Components/providers/ApiProvider.jsx';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Page404 from './Components/Page404';
import MainPage from './Components/MainPage';
import Navbar from './Components/Navbar.jsx';

const MainRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.currentUser ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = ({ socket }) => {
  const [isLogoutButtonDisabled, setisLogoutButtonDisabled] = useState(false);

  const toastContainer = (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );

  return (
    <AuthProvider>
      {toastContainer}
      <ApiProvider socket={socket}>
        <Router>
          <Navbar isLogoutButtonDisabled={isLogoutButtonDisabled} />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={(
                  <MainRoute>
                    <MainPage
                      setisLogoutButtonDisabled={setisLogoutButtonDisabled}
                    />
                  </MainRoute>
                )}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </Router>
      </ApiProvider>
    </AuthProvider>
  );
};

export default App;
