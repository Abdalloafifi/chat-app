// src/socket.jsx
import { io } from 'socket.io-client';
import { massActions } from './pages/redux/slices/messageslice'; // تحقق من المسار
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// قراءة userId من localStorage (مرة أولى)
const user = JSON.parse(localStorage.getItem("user")) || {};
const id = user?._id || null;

// إنشاء الاتصال بالسيرفر
export const socket = io("https://0l9l56xf-8080.uks1.devtunnels.ms/", {
  auth: {
    userId: id
  },
  withCredentials: true,
  autoConnect: !!id, // فقط إذا فيه userId نسمح بالاتصال التلقائي
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

// ⛔ لا تعتمد على storage event لتسجيل الدخول من نفس التاب (مش بيشتغل)
export const connectSocketManually = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const newId = user?._id;

  if (newId && newId !== socket.auth.userId) {
    socket.auth.userId = newId;
    socket.disconnect();
    socket.connect();
  }
};

// ✅ hook لمراقبة تغييرات localStorage من تابات أخرى فقط
export const useSocketAuth = () => {
  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const newId = user?._id;

      if (newId !== socket.auth.userId) {
        socket.auth.userId = newId;
        socket.disconnect();
        socket.connect();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
};

// ✅ استقبال الرسائل الجديدة
export const useNewMessage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(massActions.addNewMessage(newMessage));
    };

    const handleLikeMessage = ({ messageId, likes }) => {
      dispatch(massActions.updateMessageLike({ messageId, likes }));
    };

    const handleDeleteMessage = ({ messageId }) => {
      dispatch(massActions.deleteMessage({ messageId }));
    };

    const handleEditMessage = (updatedMessage) => {
      dispatch(massActions.updateMessageText(updatedMessage));
    };

    const handleOnlineUsers = (users) => {
      dispatch(massActions.setOnlineUsers(users));
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("likeMessage", handleLikeMessage);
    socket.on("deleteMessage", handleDeleteMessage);
    socket.on("editMessage", handleEditMessage);
    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("likeMessage", handleLikeMessage);
      socket.off("deleteMessage", handleDeleteMessage);
      socket.off("editMessage", handleEditMessage);
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [dispatch]);
};

// 🔄 إرجاع المثيل (في حالة احتجت توصل له من أماكن ثانية)
export const getIO = () => socket;
