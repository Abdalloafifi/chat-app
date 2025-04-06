// src/socket.jsx
import { io } from 'socket.io-client';

const user = JSON.parse(localStorage.getItem("user")) || {};
const id = user?.id;
console.log(id);
export const socket = io('http://localhost:3000', {
  auth: { 
    userId: id 
  },
  withCredentials: true,
  autoConnect: false, // تعطيل الاتصال التلقائي للتحكم اليدوي
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

export const getIO = () => socket;