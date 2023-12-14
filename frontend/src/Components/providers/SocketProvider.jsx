import React, { useContext, useMemo } from 'react';
import { SocketContext } from '../../contexts/index.jsx';

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ socket, children }) => {
  const clarify = (...arg) => new Promise((res, rej) => {
    socket
      .timeout(5000)
      .emit(...arg, (err, response) => (err
        ? rej(err)
        : res(response?.status === 'ok' ? response?.data : rej(err))));
  });

  const emitters = useMemo(
    () => ({
      sendMessage: (payload) => clarify('newMessage', payload),
      createChannel: (payload) => clarify('newChannel', payload),
      renameChannel: (payload) => clarify('renameChannel', payload),
      removeChannel: (payload) => clarify('removeChannel', payload),
    }),
    [socket],
  );

  return (
    <SocketContext.Provider value={emitters}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
