const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    audio: {
      type: String,
    },
    like: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    // Call record fields
    isCallRecord: {
      type: Boolean,
      default: false,
    },
    callType: {
      type: String,
      enum: ['audio', 'video', null],
      default: null,
    },
    callDuration: {
      type: Number, // in seconds
      default: 0,
    },
    callStatus: {
      type: String,
      enum: ['completed', 'missed', 'rejected', 'cancelled', null],
      default: null,
    },
    editedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
