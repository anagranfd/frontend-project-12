import React, { useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { SocketContext } from '../../contexts/index.jsx';
import {
  addChannel,
  setCurrentChannel,
  removeChannel,
  renameChannel,
} from '../../slices/channelsSlice.js';
import { addMessage, removeMessages } from '../../slices/messagesSlice.js';

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);

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
      if (sessionStorage.getItem('currentChannelId')) {
        dispatch(
          setCurrentChannel({
            channelId:
              Number(sessionStorage.getItem('currentChannelId'))
              ?? currentChannelId,
          }),
        );
      }
    });

    socketRef.current.on('renameChannel', (channel) => {
      dispatch(renameChannel({ channel }));
    });

    socketRef.current.on('removeChannel', (channel) => {
      dispatch(setCurrentChannel({ channelId: channels.ids[0] }));
      dispatch(removeMessages({ channel }));
      dispatch(removeChannel({ channel }));
    });
  });

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
