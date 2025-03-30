const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // تحقق من تنسيق البريد الإلكتروني
    },
    avatar: {
      type: String,
      default: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg", // رابط الصورة الافتراضية
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,

    },
    Address: {
      type: String,

    },
    description: {
      type: String, 
    }

  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;