# 💬 Real-Time Chat Application

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![Real-time](https://img.shields.io/badge/Realtime-Socket.io-green?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Advanced-orange?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

**تطبيق محادثة فورية متكامل مبني بتقنية MERN Stack مع ميزات أمان متقدمة ونظام إدارة علاقات اجتماعية**

[المميزات](#-المميزات-الرئيسية) •
[التقنيات](#-التقنيات-المستخدمة) •
[التثبيت](#-التثبيت-والإعداد) •
[البنية](#-بنية-المشروع) •
[الأمان](#-الأمان) •
[API Documentation](#-api-endpoints)

</div>

---

## 📋 جدول المحتويات

- [نظرة عامة](#-نظرة-عامة)
- [المميزات الرئيسية](#-المميزات-الرئيسية)
- [معاينة التطبيق](#-معاينة-التطبيق)
- [التقنيات المستخدمة](#-التقنيات-المستخدمة)
- [بنية المشروع](#-بنية-المشروع)
- [التثبيت والإعداد](#-التثبيت-والإعداد)
- [المتغيرات البيئية](#-المتغيرات-البيئية)
- [الصفحات والمسارات](#-الصفحات-والمسارات)
- [API Endpoints](#-api-endpoints)
- [Socket.io Events](#-socketio-events)
- [الأمان](#-الأمان)
- [Redux Store](#-redux-store)
- [قاعدة البيانات](#-قاعدة-البيانات)
- [الميزات المستقبلية](#-الميزات-المستقبلية)
- [المساهمة](#-المساهمة)
- [الترخيص](#-الترخيص)

---

## 🌟 نظرة عامة

تطبيق محادثة فورية شامل مبني باستخدام MERN Stack (MongoDB, Express.js, React.js, Node.js) مع دعم كامل للتواصل الفوري عبر Socket.io. التطبيق يوفر تجربة محادثة سلسة وآمنة مع ميزات متقدمة لإدارة الأصدقاء والرسائل والملفات.

### 🎯 الأهداف الرئيسية

- **الفورية**: محادثة لحظية دون تأخير باستخدام WebSockets
- **الأمان**: حماية متعددة الطبقات ضد الهجمات الإلكترونية
- **سهولة الاستخدام**: واجهة بسيطة وسلسة
- **القابلية للتوسع**: بنية مرنة قابلة للتطوير
- **التوافق**: يعمل على جميع الأجهزة والمتصفحات

---

## ✨ المميزات الرئيسية

### 💬 نظام المحادثة

- **محادثات فورية** مع تحديثات لحظية عبر WebSockets
- **دعم الوسائط المتعددة**:
  - إرسال الصور 🖼️
  - مقاطع الفيديو 🎥
  - الملفات الصوتية 🎵
- **تفاعل مع الرسائل**:
  - إعجاب ❤️
  - حذف 🗑️
  - تعديل ✏️
- **إشعارات فورية** للرسائل الجديدة
- **مؤشر الكتابة** (Typing indicator)
- **إيصالات القراءة** (Read receipts)

### 👥 إدارة الأصدقاء

- **نظام طلبات الصداقة** المتكامل
  - إرسال طلبات الصداقة
  - قبول/رفض الطلبات
  - إلغاء الطلبات المرسلة
- **قائمة الأصدقاء** مع حالة الاتصال (Online/Offline)
- **البحث عن مستخدمين** جدد
- **إزالة الأصدقاء**

### 👤 الملف الشخصي

- **تحديث المعلومات الشخصية**:
  - الاسم
  - البريد الإلكتروني
  - الصورة الشخصية
  - الحالة (Status)
- **عرض ملفات المستخدمين الآخرين**
- **رفع الصور عبر Cloudinary**

### 🔄 المزامنة عبر الأجهزة

- **مزامنة فورية** للرسائل عبر جميع الأجهزة المتصلة
- **حالة الاتصال** محدثة في الوقت الفعلي
- **إعادة الاتصال التلقائي** عند انقطاع الاتصال

### 🔐 الأمان والخصوصية

- **تشفير كلمات المرور** باستخدام bcrypt
- **مصادقة JWT** مع توكنات آمنة
- **حماية من CSRF**
- **معالجة XSS**
- **تحديد معدل الطلبات** (Rate Limiting)
- **تعقيم المدخلات** ضد NoSQL Injection
- **Cookies آمنة** (HttpOnly, Secure)

---

## 🎭 معاينة التطبيق

### الصفحات الرئيسية

#### 🏠 الصفحة الرئيسية (Landing Page)
- مقدمة عن التطبيق
- دعوة للتسجيل/تسجيل الدخول
- عرض المميزات

#### 🔐 تسجيل الدخول والتسجيل
- نماذج تسجيل دخول وتسجيل آمنة
- التحقق من البيانات على الخادم والعميل
- رسائل خطأ واضحة

#### 💬 صفحة المحادثات
- قائمة المحادثات النشطة
- آخر رسالة لكل محادثة
- عدد الرسائل غير المقروءة
- حالة الاتصال للمستخدمين

#### 👥 قائمة الأصدقاء
- عرض جميع الأصدقاء
- حالة الاتصال (Online/Offline)
- البحث في الأصدقاء
- بدء محادثة جديدة

#### 👤 الملف الشخصي
- عرض معلومات المستخدم
- تحديث الصورة الشخصية
- تعديل المعلومات
- إحصائيات المستخدم

---

## 💻 التقنيات المستخدمة

### Backend (API)

| التقنية | الاستخدام | الإصدار |
|---------|-----------|---------|
| **Node.js** | بيئة تشغيل JavaScript | - |
| **Express.js** | إطار عمل الخادم | 4.16.1 |
| **MongoDB** | قاعدة البيانات | - |
| **Mongoose** | ODM للمونجو | 8.12.2 |
| **Socket.io** | الاتصال الفوري | 4.8.1 |
| **JWT** | المصادقة | 9.0.2 |
| **Bcrypt** | تشفير كلمات المرور | 5.1.1 |
| **Multer** | رفع الملفات | 1.4.5 |
| **Cloudinary** | تخزين الصور | 2.6.0 |
| **Helmet** | أمان HTTP Headers | 8.1.0 |
| **CSURF** | حماية CSRF | 1.11.0 |
| **Express Rate Limit** | تحديد معدل الطلبات | 7.5.0 |
| **XSS Clean** | حماية من XSS | 0.1.4 |
| **Mongo Sanitize** | حماية من NoSQL Injection | 2.2.0 |
| **HPP** | حماية من HTTP Parameter Pollution | 0.2.3 |
| **Joi** | التحقق من البيانات | 17.13.3 |
| **CORS** | إدارة CORS | 2.8.5 |
| **Compression** | ضغط الاستجابات | 1.8.0 |
| **Morgan** | تسجيل الطلبات | 1.9.1 |
| **Dotenv** | إدارة المتغيرات البيئية | 16.4.7 |

### Frontend

| التقنية | الاستخدام | الإصدار |
|---------|-----------|---------|
| **React.js** | مكتبة واجهة المستخدم | 19.0.0 |
| **Vite** | أداة البناء | 6.2.0 |
| **Redux Toolkit** | إدارة الحالة | 2.6.1 |
| **React Router** | التوجيه | 7.4.0 |
| **Socket.io Client** | اتصال WebSocket | 4.8.1 |
| **Axios** | طلبات HTTP | 1.8.4 |
| **React Icons** | الأيقونات | 5.5.0 |
| **React Toastify** | الإشعارات | 11.0.5 |
| **Moment.js** | معالجة التواريخ | 2.30.1 |
| **Swiper** | السلايدر | 11.2.6 |
| **ESLint** | فحص الكود | 9.21.0 |

---

## 🏗️ بنية المشروع

```
chat-app/
├── 📁 api/                          # Backend Server
│   ├── 📁 bin/
│   │   └── www                      # نقطة دخول الخادم
│   ├── 📁 config/
│   │   ├── conectet.js              # اتصال قاعدة البيانات
│   │   └── cloudinary.js            # إعدادات Cloudinary
│   ├── 📁 controllers/              # معالجات الطلبات
│   │   ├── authController.js        # مصادقة المستخدم
│   │   ├── messagerController.js    # إدارة الرسائل
│   │   └── profileController.js     # إدارة الملفات الشخصية
│   ├── 📁 middlewares/              # الوسطاء
│   │   ├── auth.js                  # التحقق من المصادقة
│   │   ├── error.js                 # معالجة الأخطاء
│   │   ├── securityMiddleware.js    # الأمان
│   │   ├── upload.js                # رفع الملفات
│   │   └── validation.js            # التحقق من البيانات
│   ├── 📁 models/                   # نماذج البيانات
│   │   ├── User.js                  # نموذج المستخدم
│   │   └── message.js               # نموذج الرسالة
│   ├── 📁 routes/                   # المسارات
│   │   ├── index.js                 # المسار الرئيسي
│   │   ├── auth.js                  # مسارات المصادقة
│   │   ├── users.js                 # مسارات المستخدمين
│   │   ├── profile.js               # مسارات الملفات الشخصية
│   │   └── messagerrouter.js        # مسارات الرسائل
│   ├── 📁 public/                   # الملفات الثابتة
│   ├── app.js                       # إعدادات Express
│   ├── socket.js                    # إعدادات Socket.io
│   ├── .env                         # المتغيرات البيئية
│   └── package.json
│
├── 📁 frontend/                     # Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/           # المكونات القابلة لإعادة الاستخدام
│   │   │   ├── Chat-message.jsx     # مكون عرض الرسالة
│   │   │   ├── Heder-message.jsx    # رأس المحادثة
│   │   │   ├── SendMessage.jsx      # إرسال الرسالة
│   │   │   └── 📁 Navdar/           # شريط التنقل
│   │   ├── 📁 pages/                # الصفحات
│   │   │   ├── 📁 Home/             # الصفحة الرئيسية
│   │   │   ├── 📁 loginAnd register/ # تسجيل الدخول والتسجيل
│   │   │   ├── 📁 chat/             # صفحة المحادثات العامة
│   │   │   ├── 📁 chatFriends/      # محادثات الأصدقاء
│   │   │   ├── 📁 chatisok/         # غرفة المحادثة
│   │   │   ├── 📁 addfriends/       # إضافة أصدقاء
│   │   │   ├── 📁 profile/          # الملف الشخصي
│   │   │   ├── 📁 redux/            # إدارة الحالة
│   │   │   └── 📁 utils/            # وحدات مساعدة
│   │   ├── App.jsx                  # المكون الرئيسي
│   │   ├── socket.jsx               # إعدادات Socket.io للعميل
│   │   ├── main.jsx                 # نقطة الدخول
│   │   ├── App.css                  # التنسيقات الرئيسية
│   │   └── index.css                # التنسيقات العامة
│   ├── index.html                   # HTML الرئيسي
│   ├── vite.config.js               # إعدادات Vite
│   └── package.json
│
└── README.md                        # هذا الملف
```

---

## 🚀 التثبيت والإعداد

### المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:

- **Node.js** (الإصدار 18 أو أحدث) - [تحميل](https://nodejs.org/)
- **MongoDB** (محلي أو MongoDB Atlas) - [إعداد](https://www.mongodb.com/)
- **حساب Cloudinary** (لتخزين الصور) - [التسجيل](https://cloudinary.com/)
- **Git** (اختياري) - [تحميل](https://git-scm.com/)

### خطوات التثبيت

#### 1️⃣ استنساخ المشروع

```bash
# استنساخ المستودع
git clone https://github.com/yourusername/chat-app.git

# الانتقال إلى مجلد المشروع
cd chat-app
```

#### 2️⃣ إعداد Backend

```bash
# الانتقال إلى مجلد API
cd api

# تثبيت المكتبات
npm install

# إنشاء ملف .env
cp .env.example .env
# أو أنشئ الملف يدوياً وأضف المتغيرات البيئية

# تشغيل الخادم في وضع التطوير
npm start
```

الخادم سيعمل على: `http://localhost:3000`

#### 3️⃣ إعداد Frontend

```bash
# العودة للمجلد الرئيسي
cd ..

# الانتقال إلى مجلد Frontend
cd frontend

# تثبيت المكتبات
npm install

# تشغيل التطبيق في وضع التطوير
npm run dev
```

التطبيق سيعمل على: `http://localhost:5173`

#### 4️⃣ الوصول للتطبيق

افتح المتصفح وانتقل إلى: **http://localhost:5173**

---

## 🔧 المتغيرات البيئية

### Backend (.env في مجلد api)

```env
# قاعدة البيانات
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# أو استخدم URL واحد
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# الخادم
PORT=3000
NODE_ENV=development

# معدل الطلبات
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend

لا يتطلب Frontend متغيرات بيئية إضافية، ولكن يمكنك إضافة:

```env
# في ملف .env (اختياري)
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

---

## 🗺️ الصفحات والمسارات

### المسارات العامة (Public Routes)

| المسار | الصفحة | الوصف |
|--------|---------|-------|
| `/` | Landing Page | الصفحة الرئيسية للتطبيق |
| `/login` | Login | تسجيل الدخول |
| `/register` | Register | إنشاء حساب جديد |

### المسارات الخاصة (Private Routes - تتطلب مصادقة)

| المسار | الصفحة | الوصف |
|--------|---------|-------|
| `/chat` | Public Chat List | قائمة المحادثات العامة |
| `/chat/:id` | Chat Room | غرفة محادثة عامة |
| `/chat-Friend` | Friends List | قائمة الأصدقاء |
| `/chat-Friend/:id` | Friend Chat | محادثة مع صديق |
| `/add-friend` | Add Friends | البحث وإضافة أصدقاء جدد |
| `/getConfirmFriends` | Friend Requests | طلبات الصداقة الواردة |
| `/profile/:id` | User Profile | الملف الشخصي للمستخدم |

---

## 📡 API Endpoints

### Authentication APIs

#### تسجيل مستخدم جديد
```http
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}

Response: 201 Created
{
  "success": true,
  "message": "تم إنشاء الحساب بنجاح",
  "user": {
    "_id": "...",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "avatar": "default_avatar_url"
  },
  "token": "jwt_token_here"
}
```

#### تسجيل الدخول
```http
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "ahmed@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "user": { ... },
  "token": "jwt_token_here"
}
```

#### تسجيل الخروج
```http
POST /api/auth/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "تم تسجيل الخروج بنجاح"
}
```

### User APIs

#### الحصول على ملف المستخدم
```http
GET /api/user/profile/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "avatar": "...",
    "friends": [...],
    "createdAt": "..."
  }
}
```

#### تحديث الملف الشخصي
```http
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
{
  "name": "أحمد محمود",
  "avatar": <file>
}

Response: 200 OK
{
  "success": true,
  "message": "تم تحديث الملف الشخصي",
  "user": { ... }
}
```

#### البحث عن مستخدمين
```http
GET /api/user/search?q=أحمد
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "users": [
    {
      "_id": "...",
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "avatar": "..."
    }
  ]
}
```

### Friends APIs

#### إرسال طلب صداقة
```http
POST /api/user/friend-request/:userId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "تم إرسال طلب الصداقة"
}
```

#### قبول طلب صداقة
```http
POST /api/user/accept-friend/:requestId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "تم قبول طلب الصداقة"
}
```

#### رفض طلب صداقة
```http
POST /api/user/reject-friend/:requestId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "تم رفض طلب الصداقة"
}
```

#### الحصول على قائمة طلبات الصداقة
```http
GET /api/user/friend-requests
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "requests": [...]
}
```

#### الحصول على قائمة الأصدقاء
```http
GET /api/user/friends
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "friends": [...]
}
```

### Messages APIs

#### إرسال رسالة
```http
POST /api/messager/send/:receiverId
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
{
  "text": "مرحباً!",
  "image": <file> (اختياري)
}

Response: 201 Created
{
  "success": true,
  "message": {
    "_id": "...",
    "senderId": "...",
    "receiverId": "...",
    "text": "مرحباً!",
    "createdAt": "..."
  }
}
```

#### الحصول على الرسائل
```http
GET /api/messager/messages/:userId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "messages": [...]
}
```

#### حذف رسالة
```http
DELETE /api/messager/delete/:messageId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "تم حذف الرسالة"
}
```

#### تعديل رسالة
```http
PUT /api/messager/edit/:messageId
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "text": "النص الجديد"
}

Response: 200 OK
{
  "success": true,
  "message": { ... }
}
```

#### الإعجاب برسالة
```http
POST /api/messager/like/:messageId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": { ... }
}
```

---

## 🔌 Socket.io Events

### Client → Server Events

| الحدث | البيانات | الوصف |
|-------|----------|-------|
| `connection` | `{ auth: { userId } }` | الاتصال بالخادم مع معرف المستخدم |
| `disconnect` | - | قطع الاتصال |
| `sendMessage` | `{ receiverId, message }` | إرسال رسالة |
| `typing` | `{ receiverId }` | المستخدم يكتب |
| `stopTyping` | `{ receiverId }` | المستخدم توقف عن الكتابة |

### Server → Client Events

| الحدث | البيانات | الوصف |
|-------|----------|-------|
| `onlineUsers` | `[userId1, userId2, ...]` | قائمة المستخدمين المتصلين |
| `newMessage` | `{ message }` | رسالة جديدة |
| `messageDeleted` | `{ messageId }` | رسالة محذوفة |
| `messageEdited` | `{ messageId, newText }` | رسالة معدلة |
| `messageLiked` | `{ messageId, likes }` | إعجاب برسالة |
| `userTyping` | `{ userId }` | مستخدم يكتب |
| `userStopTyping` | `{ userId }` | مستخدم توقف عن الكتابة |
| `friendRequestReceived` | `{ request }` | طلب صداقة جديد |
| `friendRequestAccepted` | `{ friendId }` | تم قبول طلب الصداقة |

### مثال على الاستخدام

```javascript
// Frontend - الاتصال
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    userId: currentUser._id
  }
});

// الاستماع للمستخدمين المتصلين
socket.on('onlineUsers', (users) => {
  console.log('المستخدمون المتصلون:', users);
});

// إرسال رسالة
socket.emit('sendMessage', {
  receiverId: '123',
  message: 'مرحباً!'
});

// استقبال رسالة
socket.on('newMessage', (data) => {
  console.log('رسالة جديدة:', data.message);
});
```

---

## 🔐 الأمان

التطبيق يطبق أفضل ممارسات الأمان لحماية البيانات والمستخدمين:

### 🛡️ طبقات الحماية

#### 1. تشفير البيانات

- **كلمات المرور**: تشفير باستخدام bcrypt مع 12 salt rounds
  ```javascript
  const hashedPassword = await bcrypt.hash(password, 12);
  ```

- **التوكنات**: JWT مع سر قوي وانتهاء صلاحية (30 يوم)
  ```javascript
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  ```

#### 2. الحماية من الهجمات

| نوع الهجوم | الحل | المكتبة |
|-----------|------|---------|
| **XSS** (Cross-Site Scripting) | تعقيم المدخلات | xss-clean |
| **CSRF** (Cross-Site Request Forgery) | توكنات CSRF | csurf |
| **NoSQL Injection** | تعقيم الاستعلامات | express-mongo-sanitize |
| **HTTP Parameter Pollution** | حماية المعلمات | hpp |
| **Brute Force** | تحديد معدل الطلبات | express-rate-limit |
| **Clickjacking** | X-Frame-Options | helmet |

#### 3. إعدادات الأمان

```javascript
// تحديد معدل الطلبات
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // حد أقصى 100 طلب
  message: 'تم تجاوز عدد الطلبات المسموح به'
});

// رؤوس HTTP الآمنة
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS آمنة
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

#### 4. إدارة الجلسات

- **Cookies آمنة**:
  - `HttpOnly`: لا يمكن الوصول إليها من JavaScript
  - `Secure`: تُرسل فقط عبر HTTPS (في الإنتاج)
  - `SameSite`: حماية من CSRF

```javascript
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 يوم
});
```

#### 5. التحقق من البيانات

استخدام Joi للتحقق من صحة البيانات:

```javascript
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
```

---

## 📦 Redux Store

### البنية

```javascript
store/
├── authSlice.js        // المصادقة والمستخدم الحالي
├── messageSlice.js     // الرسائل
├── friendSlice.js      // الأصدقاء
├── socketSlice.js      // حالة Socket
└── store.js            // إعداد Store
```

### Slices الرئيسية

#### authSlice
```javascript
state: {
  user: null,           // المستخدم الحالي
  token: null,          // توكن المصادقة
  isAuthenticated: false,
  loading: false,
  error: null
}

actions:
- login()
- register()
- logout()
- updateProfile()
```

#### messageSlice
```javascript
state: {
  conversations: [],    // المحادثات
  currentChat: null,    // المحادثة الحالية
  messages: [],         // الرسائل
  loading: false
}

actions:
- sendMessage()
- fetchMessages()
- deleteMessage()
- editMessage()
- likeMessage()
```

#### friendSlice
```javascript
state: {
  friends: [],          // الأصدقاء
  requests: [],         // طلبات الصداقة
  onlineUsers: []       // المستخدمون المتصلون
}

actions:
- sendFriendRequest()
- acceptRequest()
- rejectRequest()
- removeFriend()
```

---

## 💾 قاعدة البيانات

### نماذج MongoDB

#### User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String (default),
  friends: [ObjectId], // مصفوفة من معرفات المستخدمين
  friendRequests: [{
    from: ObjectId,
    status: String (pending/accepted/rejected),
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Message Model

```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: 'User'),
  receiverId: ObjectId (ref: 'User'),
  text: String,
  image: String (optional),
  video: String (optional),
  audio: String (optional),
  likes: [ObjectId], // المستخدمون الذين أعجبوا
  isRead: Boolean (default: false),
  isEdited: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### الفهارس (Indexes)

```javascript
// User Model
email: { type: String, unique: true, index: true }

// Message Model
senderId: { type: ObjectId, index: true }
receiverId: { type: ObjectId, index: true }
createdAt: { type: Date, index: true }

// مؤشر مركب للبحث السريع
{ senderId: 1, receiverId: 1, createdAt: -1 }
```

---

## 🚀 الميزات المستقبلية

### قيد التطوير

- [ ] **مكالمات فيديو وصوت**
  - WebRTC integration
  - P2P connections
  - مكالمات جماعية

- [ ] **المحادثات الجماعية**
  - إنشاء مجموعات
  - إضافة/إزالة أعضاء
  - أدوار المستخدمين (Admin, Member)

- [ ] **القصص (Stories)**
  - قصص تختفي بعد 24 ساعة
  - مشاهدات القصص
  - الرد على القصص

- [ ] **الرموز التعبيرية والملصقات**
  - مكتبة رموز تعبيرية
  - ملصقات مخصصة
  - GIF support

- [ ] **البحث المتقدم**
  - البحث في الرسائل
  - تصفية حسب التاريخ
  - البحث في الوسائط

- [ ] **الإشعارات Push**
  - إشعارات سطح المكتب
  - إشعارات الهاتف
  - تخصيص الإشعارات

- [ ] **التشفير من طرف إلى طرف**
  - E2E encryption
  - مفاتيح خاصة لكل محادثة

- [ ] **الوضع المظلم**
  - تبديل الثيمات
  - حفظ التفضيلات

- [ ] **دعم اللغات المتعددة**
  - i18n integration
  - العربية والإنجليزية

- [ ] **الأرشفة والنسخ الاحتياطي**
  - أرشفة المحادثات
  - تصدير المحادثات
  - استيراد البيانات

---

## 📱 التوافق

### المتصفحات المدعومة

| المتصفح | الإصدار |
|---------|---------|
| Chrome | 90+ ✅ |
| Firefox | 88+ ✅ |
| Safari | 14+ ✅ |
| Edge | 90+ ✅ |
| Opera | 76+ ✅ |

### الأجهزة المدعومة

- 💻 **Desktop**: Windows, macOS, Linux
- 📱 **Mobile**: iOS, Android (عبر المتصفح)
- 📱 **Tablet**: iPad, Android Tablets

---

## 🧪 الاختبار

### تشغيل الاختبارات

```bash
# Backend tests
cd api
npm test

# Frontend tests
cd frontend
npm test
```

### أنواع الاختبارات

- **Unit Tests**: اختبار الوحدات الفردية
- **Integration Tests**: اختبار التكامل بين المكونات
- **E2E Tests**: اختبار التطبيق كاملاً

---

## 📊 الأداء

### التحسينات المطبقة

- ✅ **ضغط الاستجابات** (Compression)
- ✅ **تخزين مؤقت** (Caching)
- ✅ **تحميل كسول** (Lazy Loading)
- ✅ **تقسيم الكود** (Code Splitting)
- ✅ **تحسين الصور** (Image Optimization)

### مؤشرات الأداء

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Speed Index: < 3.0s

---

## 🐛 استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. فشل الاتصال بقاعدة البيانات

**المشكلة**: `MongoDB connection failed`

**الحل**:
```bash
# تحقق من MONGODB_URI في .env
# تأكد من صحة اسم المستخدم وكلمة المرور
# تحقق من الشبكة والاتصال بالإنترنت
```

#### 2. خطأ CORS

**المشكلة**: `CORS policy blocked`

**الحل**:
```javascript
// في api/app.js تأكد من:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

#### 3. Socket.io لا يعمل

**المشكلة**: `Socket connection failed`

**الحل**:
```javascript
// تحقق من أن الخادم يعمل
// تحقق من إعدادات CORS في socket.js
// تحقق من auth.userId في العميل
```

#### 4. فشل رفع الصور

**المشكلة**: `Cloudinary upload failed`

**الحل**:
```bash
# تحقق من بيانات Cloudinary في .env
# تأكد من صحة API Key و Secret
# تحقق من حجم الصورة (حد أقصى 10MB)
```

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

### خطوات المساهمة

1. **Fork المشروع**
   ```bash
   # انقر على زر Fork في GitHub
   ```

2. **استنساخ نسختك**
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

3. **إنشاء فرع جديد**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **إجراء التغييرات**
   ```bash
   # اكتب الكود
   # اختبر التغييرات
   ```

5. **Commit التغييرات**
   ```bash
   git add .
   git commit -m "Add: ميزة رائعة"
   ```

6. **Push للفرع**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **فتح Pull Request**
   - اذهب إلى صفحة المشروع الأصلي
   - اضغط على "New Pull Request"
   - أضف وصفاً تفصيلياً للتغييرات

### معايير الكود

- استخدم ESLint للتحقق من الكود
- اتبع نمط الكود الموجود
- أضف تعليقات واضحة
- اكتب اختبارات للميزات الجديدة

---

## 👨‍💻 الفريق

تم تطوير هذا المشروع بواسطة:

- **المطور**: [اسمك](https://github.com/yourusername)
- **البريد الإلكتروني**: your.email@example.com

---

## 📄 الترخيص

هذا المشروع مرخص تحت **MIT License** - انظر ملف [LICENSE](LICENSE) لمزيد من التفاصيل.

```
MIT License

Copyright (c) 2024 [اسمك]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 شكر وتقدير

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.io](https://socket.io/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Cloudinary](https://cloudinary.com/)
- [Vite](https://vitejs.dev/)

---

## 📞 تواصل معنا

- 🌐 **الموقع**: [yourwebsite.com](https://yourwebsite.com)
- 💼 **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 🐦 **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- 📧 **البريد**: your.email@example.com
- 💬 **Discord**: [Join our server](https://discord.gg/yourserver)

---

## ⭐ إذا أعجبك المشروع

إذا وجدت هذا المشروع مفيداً، يرجى إعطاؤه ⭐ على GitHub!

[![Star on GitHub](https://img.shields.io/github/stars/yourusername/chat-app?style=social)](https://github.com/yourusername/chat-app)

---

<div align="center">

**صنع بـ ❤️ من أجل مجتمع المطورين**

[⬆ العودة للأعلى](#-real-time-chat-application)

</div>