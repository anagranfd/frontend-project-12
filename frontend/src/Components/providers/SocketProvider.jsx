import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { SocketContext } from '../../contexts/index.jsx';

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = io();

  useEffect(() => () => {
    socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
