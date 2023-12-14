import { createContext } from 'react';
import io from 'socket.io-client';

const AuthContext = createContext({});
const SocketContext = createContext(null);
const socket = io();

export { AuthContext, SocketContext, socket };
