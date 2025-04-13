# Secure Chat Application  
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)  
![Real-time](https://img.shields.io/badge/Realtime-Socket.io-green)  
![Security](https://img.shields.io/badge/Security-Advanced-orange)

A full-stack real-time chat application with advanced authentication, social relationship management, and end-to-end security.

## Table of Contents
- [Features](#features-)
- [Pages](#pages-)
- [Technologies](#technologies-)
- [Project Structure](#project-structure-)
- [Installation](#installation-)
- [API Endpoints](#api-endpoints-)
- [Security](#security-)
- [Contributing](#contributing-)
- [License](#license-)

---

## Features ✨
- **Real-time messaging** with file support (images/videos/audio)
- **Friend request system** with instant confirmation
- Message interactions (likes, delete, edit)
- **Cross-device sync** via WebSockets
- Dynamic profile updates (avatar, personal info)
- Advanced cybersecurity protections

---

## Pages 🖥️
| Route                  | Description                          | Protection   |
|------------------------|--------------------------------------|--------------|
| `/`                    | Landing Page                        | Public       |
| `/login`               | User Login                          | Public       |
| `/register`            | User Registration                   | Public       |
| `/chat`                | Public Chat List                    | Private      |
| `/chat/:id`            | 1:1 Chat (Public Mode)              | Private      |
| `/chat-Friend`         | Friends List                        | Private      |
| `/chat-Friend/:id`     | Friend Chat                         | Private      |
| `/add-friend`          | Add New Friends                     | Private      |
| `/getConfirmFriends`   | Confirm Friend Requests             | Private      |
| `/profile/:id`         | User Profile Page                   | Private      |

---

## Technologies 💻
### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Real-time:** Socket.io
- **Security:** JWT, Helmet, CSRF, Rate Limiter
- **File Storage:** Cloudinary

### Frontend
- **Library:** React.js
- **State Management:** Redux Toolkit + LocalStorage
- **Routing:** React Router v6
- **Real-time:** Socket.io Client
- **UI:** CSS Modules + Responsive Design
- **Notifications:** react-toastify

---

## Project Structure 📂


---

## Installation 🛠️
### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI
- Cloudinary Account

### Setup Instructions
1. Configure Environment Variables (Backend):
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url

cd backend
npm install
npm run dev


Security 🔒
Protection Measures
Data Encryption:

Passwords: bcrypt with salt rounds = 12

Tokens: JWT with 30-day expiry

Attack Prevention:

CSRF Tokens for all requests

Rate Limiting (100 requests/15min)

XSS Sanitization for all inputs

Session Management:

Cookies: HttpOnly + Secure in Production

Automatic Socket reconnection on user change