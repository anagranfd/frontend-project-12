import React, { useContext, useMemo, useCallback } from 'react';
import { SocketContext } from '../../contexts/index.jsx';

export const useSocket = () => useContext(SocketContext);

const ApiProvider = ({ socket, children }) => {
  const clarify = useCallback(
    (...arg) => new Promise((res, rej) => {
      socket
        .timeout(5000)
        .emit(...arg, (err, response) => (err
          ? rej(err)
          : res(response?.status === 'ok' ? response?.data : rej(err))));
    }),
    [socket],
  );

  const emitters = useMemo(
    () => ({
      sendMessage: (payload) => clarify('newMessage', payload),
      createChannel: (payload) => clarify('newChannel', payload),
      renameChannel: (payload) => clarify('renameChannel', payload),
      removeChannel: (payload) => clarify('removeChannel', payload),
    }),
    [clarify],
  );

  return (
    <SocketContext.Provider value={emitters}>{children}</SocketContext.Provider>
  );
};

export default ApiProvider;
