const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const passwordComplexity = require("joi-password-complexity");
const xss = require('xss');
const Joi = require('joi');

const {genarateTokenAndCookies} = require('../middlewares/genarattokenandcookies');
// التحقق من وجود المتغيرات البيئية
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET غير موجود في المتغيرات البيئية');
}



/**
 * @desc    تسجيل مستخدم جديد
 * @route   POST /api/auth/register
 * @access  عام
 */
exports.register = asyncHandler(async (req, res) => {
    const data = {
        username: xss(req.body.username?.trim()),
        email: xss(req.body.email?.trim()),
        password: xss(req.body.password)
    };

    // التحقق من صحة البيانات
    const { error } = validateRegister(data);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    console.log("aaaaaa")

    // التحقق من وجود المستخدم
    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
        return res.status(401).json({ error: 'المستخدم موجود بالفعل!' });
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // إنشاء مستخدم جديد
    const newUser = new User({
        username: data.username,
        email: data.email,
        password: hashedPassword,
    });

    try {
        const user = await newUser.save();
        genarateTokenAndCookies(user._id, res);

        // إرسال الاستجابة
        const foundUser = await User.findById(user._id).select('-password -email');
        res.status(201).json(foundUser);
        // res.status(201).json({
        //     id: user._id,
        //     username: user.username,
        //     avatar: user.avatar
        // });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// دالة التحقق من صحة بيانات التسجيل
function validateRegister(data) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required().messages({
            'string.min': 'اسم المستخدم يجب أن يكون على الأقل 3 أحرف',
            'string.max': 'اسم المستخدم يجب ألا يتجاوز 30 حرفًا',
            'any.required': 'اسم المستخدم مطلوب'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'البريد الإلكتروني غير صحيح',
            'any.required': 'البريد الإلكتروني مطلوب'
        }),
        password: passwordComplexity().required().messages({
            'any.required': 'كلمة المرور مطلوبة'
        })
    });
    return schema.validate(data);
}

/**
 * @desc    تسجيل دخول المستخدم
 * @route   POST /api/auth/login
 * @access  عام
 */
exports.login = asyncHandler(async (req, res) => {
    try {

        const data = {
            email: xss(req.body.email),
            password: xss(req.body.password)
        };
        console.log(req.body)
        // التحقق من صحة البيانات
        const { error } = validateLogin(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });

        }
        // البحث عن المستخدم
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(400).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة!' });
        }
        console.log("aaaaaa0")

        // التحقق من كلمة المرور
        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة!' });
        }
        genarateTokenAndCookies(user._id, res);

        // إرسال الاستجابة
        res.status(200).json( user);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});

// دالة التحقق من صحة بيانات الدخول
function validateLogin(data) {
    const schema = Joi.object({
        email: Joi.string().email().required().trim().messages({
            'string.email': 'البريد الإلكتروني غير صحيح',
            'any.required': 'البريد الإلكتروني مطلوب'
        }),
        password: passwordComplexity().required().messages({
            'any.required': 'كلمة المرور مطلوبة'
        })
    });
    return schema.validate(data);
}

/**
 * @desc    تسجيل دخول المستخدم
 * @route   POST /api/auth/viledLogin
 * @access  عام
 */
exports.viledLogin = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        genarateTokenAndCookies(user._id, res);
        

        // إرسال الاستجابة
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

/**
 * @desc    حذف المستخدم
 * @route   POST /api/auth/deleteUser
 * @access  خاص
 */

exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * @desc    تسجيل خروج المستخدم
 * @route   POST /api/auth/logout
 * @access  خاص
 */
exports.logout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie('token'); // حذف الكوكيز
        res.status(200).json({ message: 'تم تسجيل الخروج بنجاح!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});