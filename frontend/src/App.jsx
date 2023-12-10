import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from './hooks/index.jsx';
import AuthProvider from './Components/providers/AuthProvider.jsx';
import SocketProvider from './Components/providers/SocketProvider.jsx';
// import { SocketContext } from './contexts/index.jsx';
// import socket from './Components/socket.js';

// import {
//   addChannel,
//   setCurrentChannel,
//   removeChannel,
//   renameChannel,
// } from './slices/channelsSlice.js';
// import { addMessage, removeMessages } from './slices/messagesSlice.js';

import Login from './Components/Login';
import Signup from './Components/Signup';
import Page404 from './Components/Page404';
import MainPage from './Components/MainPage';
import Navbar from './Components/Navbar.jsx';

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
  // const dispatch = useDispatch();
  // const channels = useSelector((state) => state.channels);
  // const currentChannelId = useSelector((state) => state.currentChannelId);
  // const messages = useSelector((state) => state.messages);

  // const [currentChannelId, setCurrentChannel] = useState(null);
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

  // const socketRef = useRef(null);

  // useEffect(() => {
  //   socket = io();
  //   return () => {
  //     sessionStorage.removeItem('currentChannelId');
  //     socket.disconnect();
  //   };
  // }, []);

  // const socket = useContext(SocketContext);

  // useEffect(() => {
  //   socket.on('connect_error', () => {
  //     console.log('Произошла ошибка соединения с сервером.');
  //     setTimeout(() => {
  //       socket.connect();
  //     }, 1000);
  //   });

  //   socket.on('newMessage', (message) => {
  //     dispatch(addMessage({ message }));
  //   });

  //   socket.on('newChannel', (channel) => {
  //     dispatch(addChannel({ channel }));
  //     if (sessionStorage.getItem('currentChannelId')) {
  //       dispatch(
  //         setCurrentChannel({
  //           channelId:
  //             Number(sessionStorage.getItem('currentChannelId')) ??
  //             currentChannelId,
  //         })
  //       );
  //     }
  //   });

  //   socket.on('renameChannel', (channel) => {
  //     dispatch(renameChannel({ channel }));
  //   });

  //   socket.on('removeChannel', (channel) => {
  //     dispatch(setCurrentChannel({ channelId: channels.ids[0] }));
  //     dispatch(removeMessages({ channel }));
  //     dispatch(removeChannel({ channel }));
  //   });

  //   // socket.on('disconnect', (reason) => {
  //   //   if (reason === 'io server disconnect') {
  //   //     socket.connect();
  //   //   }
  //   // });
  // });

  return (
    <AuthProvider>
      {toastContainer}
      <SocketProvider>
        <Router>
          <Navbar isLogoutButtonDisabled={isLogoutButtonDisabled} />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={(
                  <MainRoute>
                    <MainPage
                      // socket={socket}
                      notify={notify}
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
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
