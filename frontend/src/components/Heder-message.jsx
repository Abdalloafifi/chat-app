import React from 'react';
import './Header.css'; // تأكد من وجود ملف التنسيق
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const HeaderMessage = () => {
  const { id } = useParams(); // استخراج المعرف من الـ URL
  const userList = useSelector((state) => state.message.allClin); // التأكد من وجود بيانات
  
  const user = userList.find(user => user._id === id); // البحث عن المستخدم في القائمة

  return (
    <header className="chat-header">
      <div className="user-info">
        {user&& (
          <Link  className='user-link user-link-header ' to={`/profile/${user._id}`}>
            <img src={user.avatar} alt={`${user.username}'s avatar`} className="user-avatar" />
            <div className="user-details">
              <span className="user-name">{user.username}</span>
            </div>
          </Link>
        ) }
      </div>
      <div className="header-icons">
        <i className="icon phone-icon">📞</i>
        <i className="icon camera-icon">📷</i>
      </div>
    </header>
  );
};

export default HeaderMessage;
