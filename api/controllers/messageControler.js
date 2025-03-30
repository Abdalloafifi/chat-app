const User = require("../models/User");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const xss = require("xss");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");
const { promisify } = require("util");
const { getReceiverSocketId, io } = require("../socket"); // استيراد io والدالة الخاصة بالـ socket

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET غير موجود في المتغيرات البيئية");
}

/**
 * @desc   get all users
 * @route  GET /api/messager/allusers
 * @access  عام
 */
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password -email"
  );
  if (!users) {
    return res.status(404).json({ message: "لا يوجد مستخدمين" });
  }
  res.status(200).json(users);
});

/**
 * @desc   get messages-chat
 * @route  GET /api/messager/messages/:id
 * @access  خاص
 */
exports.getMessages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId: id },
        { senderId: id, receiverId: req.user._id },
      ],
    })
    .sort({ createdAt: 1 })
    .populate("senderId", "username avatar")
    .populate("receiverId", "username avatar");

  if (messages.length === 0) {
    return res.status(404).json({ message: "لا يوجد رسائل" });
  }

  res.status(200).json(messages);
});

/**
 * @desc   send message text or image or video or audio
 * @route  POST /api/messager/sendmessage/:id
 * @access  خاص
 */
exports.sendMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "معرّف مستلم غير صالح" });
  }
  console.log("test1");

  const receiver = await User.findById(id);
  if (!receiver) {
    return res.status(404).json({ message: "المستلم غير موجود" });
  }
  console.log("test2");

  const sanitizedText = text ? xss(text) : undefined;

  const newMessage = {
    senderId: req.user._id,
    receiverId: id,
    text: sanitizedText,
  };

  if (req.file) {
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "chat/messages", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      
      const fileType = req.file.mimetype.split('/')[0];
      switch(fileType) {
        case 'image': newMessage.image = result.secure_url; break;
        case 'video': newMessage.video = result.secure_url; break;
        case 'audio': newMessage.audio = result.secure_url; break;
      }
    } catch (uploadError) {
      console.log(uploadError);
      return res.status(500).json({ message: "فشل رفع الملف" });
    }
  }
  console.log("test3");

  if (!newMessage.text && !newMessage.image && !newMessage.video && !newMessage.audio) {
    return res.status(400).json({ message: "الرسالة لا تحتوي على محتوى" });
  }
  console.log("test4");

  const createdMessage = await Message.create(newMessage);
  const populatedMessage = await Message.findById(createdMessage._id)
    .populate("senderId", "username avatar")
    .populate("receiverId", "username avatar");

  // إرسال رسالة عبر socket للمستلم إذا كان متصلاً
  const receiverSocketId = getReceiverSocketId(id);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", populatedMessage);
  }
  // يمكن أيضاً إرسال الحدث للمرسل (للتحديث اللحظي)
  const senderSocketId = getReceiverSocketId(req.user._id.toString());
  if (senderSocketId) {
    io.to(senderSocketId).emit("newMessage", populatedMessage);
  }

  res.status(201).json(populatedMessage);
  console.log("test4");
});

/**
 * @desc   like message
 * @route  POST /api/messager/like/:id
 * @access  خاص
 */
exports.likeMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return res.status(404).json({ message: "الرسالة غير موجودة" });
  }
  const userId = req.user._id;
  const index = message.like.indexOf(userId);
  console.log(index);
  if (index === -1) {
    message.like.push(userId);
  } else {
    message.like.splice(index, 1);
  }
  await message.save();

  // إرسال حدث "likeMessage" لتحديث حالة الإعجاب في الوقت الفعلي
  const receiverSocketId = getReceiverSocketId(message.receiverId.toString());
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("likeMessage", { messageId: id, likes: message.like });
  }
  const senderSocketId = getReceiverSocketId(message.senderId.toString());
  if (senderSocketId) {
    io.to(senderSocketId).emit("likeMessage", { messageId: id, likes: message.like });
  }

  res.status(200).json({ message: "تم تحديث الإعجاب" });
});

/**
 * @desc   delete message
 * @route  DELETE /api/messager/delete/:id
 * @access  خاص
 */
exports.deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);

  if (!message) return res.status(404).json({ message: "الرسالة غير موجودة" });

  // حذف الملف من Cloudinary إذا كان موجودًا
  const fileKey = message.image || message.video || message.audio;
  if (fileKey) {
    const publicId = fileKey.split("/").slice(-2).join("/").split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  }

  await message.deleteOne();

  // إرسال حدث "deleteMessage" لتحديث الواجهات في الوقت الفعلي
  const receiverSocketId = getReceiverSocketId(message.receiverId.toString());
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("deleteMessage", { messageId: id });
  }
  const senderSocketId = getReceiverSocketId(message.senderId.toString());
  if (senderSocketId) {
    io.to(senderSocketId).emit("deleteMessage", { messageId: id });
  }

  res.status(200).json({ message: "تم حذف الرسالة بنجاح" });
});
