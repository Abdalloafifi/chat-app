const User = require("../models/User");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const xss = require("xss");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");
const { promisify } = require("util");
const { getReceiverSocketId, getIO } = require("../socket"); // استيراد io والدالة الخاصة بالـ socket

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET غير موجود في المتغيرات البيئية");
}

/**
 * @desc   get all users
 * @route  GET /api/messager/allusers
 * @access  عام
 */
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isok: true }).select(
    "-password -email"
  );
  // التحقق من عدم وجود مستخدمين في المصفوفة
  if (users.length === 0) {
    return res.status(400).json({ message: " لا يوجد مستخدمين" });
  }
  res.status(200).json(users);
});

/**
 * @desc   get all users frind
 * @route  GET /api/messager/frinds
 * @access  عام
 */
exports.getAllFriends = asyncHandler(async (req, res) => {
  try {

    const users = await User.findById(req.user._id).select(
      "frinds  "
    ).populate("frinds", "username avatar");
    if (!users) {
      return res.status(404).json({ message: "لا يوجد مستخدمين" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "حدث خطأ أثناء تحميل الأصدقاء" });

  }
});
/**
 * @desc   get all users 
 * @route  GET /api/messager/users
 * @access  عام
 */
exports.getUsers = asyncHandler(async (req, res) => {
  // استرجاع بيانات المستخدم الحالي للحصول على قائمة الأصدقاء
  const currentUser = await User.findById(req.user._id);

  // تجهيز مصفوفة تحتوي على معرف المستخدم الحالي ومعرفات جميع الأصدقاء (افتراضًا أن قائمة الأصدقاء موجودة في currentUser.friends)
  const excludeIds = [req.user._id, ...currentUser.frinds, ...currentUser.FriendRequests];

  // استعلام لجلب جميع المستخدمين باستثناء المستخدم الحالي والأصدقاء
  const users = await User.find({
    _id: { $nin: excludeIds }
  }).select("-password -email");

  // التحقق من وجود مستخدمين بالنتيجة
  // if (users.length === 0) {
  //   return res.status(400).json({ message: "لا يوجد مستخدمين" });
  // }

  res.status(200).json(users);
});

/**
 * @desc   post add-frind
 * @route  post /api/messager/addFriends
 * @access  خاص
 */
exports.addFriends = asyncHandler(async (req, res) => {
  try {
    const data = {
      friendId: xss(req.body.friendId),

    }
    const friend = await User.findByIdAndUpdate(data.friendId, { $addToSet: { FriendRequests: req.user._id } }, { new: true });
    if (!friend) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }
    const user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { waiting: data.friendId } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }
    res.status(200).json({ _id: data.friendId });

  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ message: "حدث خطأ أثناء إضافة الصديق" });

  }
})


/**
 * @desc   get  frinds Confirm the order
 * @route  GET /api/messager/frinds/Confirm-order
  * @access  خاص
 */
exports.getConfirmFriends = asyncHandler(async (req, res) => {
  try {

    const users = await User.findById(req.user._id).select(
      "FriendRequests  "
    ).populate("FriendRequests", "username avatar _id");
    if (!users) {
      return res.status(404).json({ message: "لا يوجد مستخدمين" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "حدث خطأ أثناء تحميل الأصدقاء" });

  }
});
/**
 * @desc   post Confirm the order
 * @route  post /api/messager/Confirm-order
  * @access  خاص
 */
exports.ConfirmOrder = asyncHandler(async (req, res) => {
  try {
    const data = {
      friendId: xss(req.body.friendId),

    }
    const friend = await User.findByIdAndUpdate(data.friendId, { $addToSet: { frinds: req.user._id } }, { new: true });
    if (!friend) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }
    const user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { frinds: data.friendId } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }
    // إزالة طلب الصداقة من كلا المستخدمين
    await User.findByIdAndUpdate(data.friendId, { $pull: { FriendRequests: req.user._id } }, { new: true });
    await User.findByIdAndUpdate(req.user._id, { $pull: { waiting: data.friendId } }, { new: true });
    res.status(200).json({ _id: data.friendId });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ message: "حدث خطأ أثناء تأكيد الطلب" });
  }
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

  // if (messages.length === 0) {
  //   return res.status(400).json({ message: "لا يوجد رسائل" });
  // }
  console.log(messages.length);
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
      switch (fileType) {
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
  console.log("test5");
  // إرسال رسالة عبر socket للمستلم إذا كان متصلاً
  const receiverSocketId = getReceiverSocketId(receiver._id.toString());
  if (receiverSocketId) {
    const io = getIO(); // التأكد من إن io مُهيأ
    io.to(receiverSocketId).emit("newMessage", populatedMessage);
  }

  // إرسال الحدث للمرسل (للتحديث اللحظي)
  const senderSocketId = getReceiverSocketId(req.user._id.toString());
  if (senderSocketId) {
    const io = getIO();
    io.to(senderSocketId).emit("newMessage", populatedMessage);
  }
  console.log("test6");

  res.status(201).json(populatedMessage);
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
  const io = getIO(); // Fix: استخدام getIO() بدلاً من io المباشر
  const receiverSocketId = getReceiverSocketId(message.receiverId.toString());
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("likeMessage", { messageId: id, likes: message.like });
  }
  const senderSocketId = getReceiverSocketId(message.senderId.toString());
  if (senderSocketId) {
    io.to(senderSocketId).emit("likeMessage", { messageId: id, likes: message.like });
  }

  res.status(200).json({ message: "تم تحديث الإعجاب", likes: message.like });
});

/**
 * @desc   delete message for everyone
 * @route  DELETE /api/messager/delete-for-everyone/:id
 * @access  خاص
 */
exports.deleteForEveryone = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);

  if (!message) return res.status(404).json({ message: "الرسالة غير موجودة" });

  // التحقق من أن المستخدم هو المرسل (فقط المرسل يقدر يحذف للجميع)
  if (!message.senderId.equals(req.user._id)) {
    return res.status(403).json({ message: "غير مصرح لك بحذف هذه الرسالة للجميع" });
  }

  // حذف الملف من Cloudinary إذا كان موجودًا
  const fileKey = message.image || message.video || message.audio;
  if (fileKey) {
    const publicId = fileKey.split("/").slice(-2).join("/").split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  }

  // حذف الرسالة نهائياً
  await Message.findByIdAndDelete(id);

  // إرسال حدث "deleteForEveryone" لجميع الأطراف
  const io = getIO();
  const receiverSocketId = getReceiverSocketId(message.receiverId.toString());
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("deleteForEveryone", { messageId: id });
  }
  const senderSocketId = getReceiverSocketId(message.senderId.toString());
  if (senderSocketId) {
    io.to(senderSocketId).emit("deleteForEveryone", { messageId: id });
  }

  res.status(200).json({ message: "تم حذف الرسالة للجميع بنجاح" });
});

/**
 * @desc   edit message text
 * @route  PUT /api/messager/edit/:id
 * @access  خاص
 */
exports.editMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "النص لا يمكن أن يكون فارغاً" });
  }

  const message = await Message.findById(id);
  if (!message) {
    return res.status(404).json({ message: "الرسالة غير موجودة" });
  }

  // التحقق من أن المستخدم هو المرسل - استخدم equals() للمقارنة الصحيحة
  if (!message.senderId.equals(req.user._id)) {
    return res.status(403).json({ message: "غير مصرح لك بتعديل هذه الرسالة" });
  }

  // لا يمكن تعديل رسائل الوسائط (صور، فيديو، صوت)
  if (message.image || message.video || message.audio) {
    return res.status(400).json({ message: "لا يمكن تعديل رسائل الوسائط" });
  }

  // التحقق من أن الرسالة نصية أصلاً
  if (!message.text) {
    return res.status(400).json({ message: "لا يمكن تعديل هذه الرسالة" });
  }

  const sanitizedText = xss(text);
  message.text = sanitizedText;
  message.editedAt = new Date();
  await message.save();

  const populatedMessage = await Message.findById(message._id)
    .populate("senderId", "username avatar")
    .populate("receiverId", "username avatar");

  // إرسال حدث "editMessage" لتحديث الواجهات في الوقت الفعلي
  const io = getIO();
  const receiverSocketId = getReceiverSocketId(message.receiverId.toString());
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("editMessage", populatedMessage);
  }
  const senderSocketId = getReceiverSocketId(message.senderId.toString());
  if (senderSocketId) {
    io.to(senderSocketId).emit("editMessage", populatedMessage);
  }

  res.status(200).json(populatedMessage);
});

/**
 * @desc   Create call record
 * @route  POST /api/messager/call-record
 * @access  Private
 */
exports.createCallRecord = asyncHandler(async (req, res) => {
  const { receiverId, callType, callDuration, callStatus } = req.body;

  // التحقق من وجود المستلم
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  const callRecord = await Message.create({
    senderId: req.user._id,
    receiverId,
    isCallRecord: true,
    callType,
    callDuration: callDuration || 0,
    callStatus,
    text: callStatus === 'completed'
      ? `مكالمة ${callType === 'audio' ? 'صوتية' : 'مرئية'} - ${Math.floor(callDuration / 60)}:${String(callDuration % 60).padStart(2, '0')}`
      : callStatus === 'missed'
        ? `مكالمة ${callType === 'audio' ? 'صوتية' : 'مرئية'} فائتة`
        : `مكالمة ${callType === 'audio' ? 'صوتية' : 'مرئية'} ${callStatus === 'rejected' ? 'مرفوضة' : 'ملغاة'}`
  });

  const populatedRecord = await Message.findById(callRecord._id)
    .populate("senderId", "username avatar")
    .populate("receiverId", "username avatar");

  // Send via socket to both users
  const io = getIO();
  const receiverSocketId = getReceiverSocketId(receiverId.toString());
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", populatedRecord);
  }
  const senderSocketId = getReceiverSocketId(req.user._id.toString());
  if (senderSocketId) {
    io.to(senderSocketId).emit("newMessage", populatedRecord);
  }

  res.status(201).json(populatedRecord);
});
