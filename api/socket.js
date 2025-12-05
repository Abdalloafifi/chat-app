const { Server } = require("socket.io");
let io;
const userSocketMap = {};

// تهيئة الـ Socket.IO وربطه بالسيرفر
const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"], // الأصول المسموحة
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // تخزين معرف المستخدم عند الاتصال
    const userId = socket.handshake.auth.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // إرسال قائمة المتصلين للجميع
    io.emit("onlineUsers", Object.keys(userSocketMap));

    // === WebRTC Call Signaling Events ===

    // بدء مكالمة - إرسال إشعار للمستلم
    socket.on("call:start", ({ to, from, callType, offer }) => {
      const receiverSocketId = userSocketMap[to];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("call:incoming", {
          from,
          callType, // "audio" or "video"
          offer
        });
      }
    });

    // قبول المكالمة - إرسال الإجابة للمتصل
    socket.on("call:accept", ({ to, answer }) => {
      const callerSocketId = userSocketMap[to];
      if (callerSocketId) {
        io.to(callerSocketId).emit("call:accepted", { answer });
      }
    });

    // رفض المكالمة
    socket.on("call:reject", ({ to }) => {
      const callerSocketId = userSocketMap[to];
      if (callerSocketId) {
        io.to(callerSocketId).emit("call:rejected");
      }
    });

    // إنهاء المكالمة
    socket.on("call:end", ({ to }) => {
      const otherUserSocketId = userSocketMap[to];
      if (otherUserSocketId) {
        io.to(otherUserSocketId).emit("call:ended");
      }
    });

    // تبادل ICE candidates
    socket.on("call:ice-candidate", ({ to, candidate }) => {
      const otherUserSocketId = userSocketMap[to];
      if (otherUserSocketId) {
        io.to(otherUserSocketId).emit("call:ice-candidate", { candidate });
      }
    });

    // إدارة انفصال المستخدم
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (userId) delete userSocketMap[userId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
    });
  });
};

// دالة لإرجاع socketId الخاص بالمستخدم
const getReceiverSocketId = (userId) => userSocketMap[userId];

// دالة getter للـ io للتأكد من أنه تم تهيئته
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized. Call setupSocket() first.");
  }
  return io;
};

module.exports = { setupSocket, getReceiverSocketId, getIO };
