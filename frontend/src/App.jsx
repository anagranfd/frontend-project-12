import React, {
  useState, useEffect, useRef, useMemo,
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';
// import socket from './Components/socket.js';

import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channelsSlice.js';
import { addMessage, removeMessages } from './slices/messagesSlice.js';

import Login from './Components/Login';
import Signup from './Components/Signup';
import Page404 from './Components/Page404';
import MainPage from './Components/MainPage';
import Navbar from './Components/Navbar.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  // Используем useMemo для создания объекта, который не будет
  // пересоздаваться на каждом рендере
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

const MainRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  // console.log(auth.loggedIn);
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  // const messages = useSelector((state) => state.messages);

  const [currentChannelId, setCurrentChannel] = useState(null);
  const [isLogoutButtonDisabled, setisLogoutButtonDisabled] = useState(false);
  // const logoutButtonRef = useRef(null);

  const notify = (msg) => toast(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

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

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io();
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on('connect_error', () => {
      console.log('Произошла ошибка соединения с сервером.');
      setTimeout(() => {
        socketRef.current.connect();
      }, 1000);
    });

    socketRef.current.on('newMessage', (message) => {
      dispatch(addMessage({ message }));
    });

    socketRef.current.on('newChannel', (channel) => {
      dispatch(addChannel({ channel }));
      setCurrentChannel(channel.id);
    });

    socketRef.current.on('renameChannel', (channel) => {
      dispatch(renameChannel({ channel }));
    });

    socketRef.current.on('removeChannel', (channel) => {
      // console.log(channel.id);
      // console.log(currentChannelId);
      // setCurrentChannel(
      //   currentChannelId === channel.id ? channels.ids[0] : currentChannelId
      // );
      setCurrentChannel(channels.ids[0]);
      dispatch(removeMessages({ channel }));
      dispatch(removeChannel({ channel }));
    });

    // socketRef.current.on('disconnect', (reason) => {
    //   if (reason === 'io server disconnect') {
    //     socketRef.current.connect();
    //   }
    // });
  });

  return (
    <AuthProvider>
      <Router>
        <Navbar isLogoutButtonDisabled={isLogoutButtonDisabled} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={(
                <MainRoute>
                  <MainPage
                    setCurrentChannel={setCurrentChannel}
                    currentChannelId={currentChannelId}
                    socket={socketRef}
                    notify={notify}
                    toastContainer={toastContainer}
                    setisLogoutButtonDisabled={setisLogoutButtonDisabled}
                  />
                </MainRoute>
              )}
            />
            <Route
              path="/login"
              element={
                <Login notify={notify} toastContainer={toastContainer} />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup notify={notify} toastContainer={toastContainer} />
              }
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
