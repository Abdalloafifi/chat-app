// src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  withCredentials: true,
  autoConnect: true
});

socket.connect();

export const getIO = () => socket;