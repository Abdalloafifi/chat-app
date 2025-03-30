const { Server } = require("socket.io");
let io;
const userSocketMap = {};

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"], // إضافة طرق HTTP المسموحة
      credentials: true // السماح بالإرسال مع التصريح
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // تخزين معرف المستخدم عند الاتصال
    const userId = socket.handshake.auth.userId; // استخدام auth بدل query
    if (userId) userSocketMap[userId] = socket.id;

    // إرسال قائمة المتصلين للجميع
    io.emit("onlineUsers", Object.keys(userSocketMap));

    // إدارة انفصال المستخدم
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (userId) delete userSocketMap[userId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
    });
  });
};

const getReceiverSocketId = (userId) => userSocketMap[userId];

module.exports = { setupSocket, getReceiverSocketId, io };
