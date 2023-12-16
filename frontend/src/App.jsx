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
import { socket } from './contexts/index.jsx';
import AuthProvider from './Components/providers/AuthProvider.jsx';
import SocketProvider from './Components/providers/SocketProvider.jsx';
import store from './slices/index.js';
import { actionsMessages } from './slices/messagesSlice.js';
import { actionsChannels } from './slices/channelsSlice.js';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Page404 from './Components/Page404';
import MainPage from './Components/MainPage';
import Navbar from './Components/Navbar.jsx';

const MainRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
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

  socket.on('connect_error', () => {
    setTimeout(() => {
      socket.connect();
    }, 1000);
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
    <AuthProvider>
      {toastContainer}
      <SocketProvider socket={socket}>
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
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
