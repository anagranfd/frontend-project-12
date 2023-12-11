import React, { useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { SocketContext } from '../../contexts/index.jsx';

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io();

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
