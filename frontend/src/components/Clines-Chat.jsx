import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../pages/redux/apicalls/messageapi';
import "./clinesChat.css";
import { Link } from 'react-router-dom';

const ClinesChat = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.message.allClin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const sortedUsers = userList
    ? [...userList].sort(
        (a, b) =>
          new Date(b.lastMessageTimestamp || 0) - new Date(a.lastMessageTimestamp || 0)
      )
    : [];

  return (
    <div className="clines-chat-container">
      <div className="clines-chat-users ">
        {sortedUsers.map((user) => (
          <Link key={user._id} to={`/chat/${user._id}`} className="user-link">
            <div className="user-item">
              {user.avatar && (
                <img src={user.avatar} alt={`${user.username}'s avatar`} className="user-avatar" />
              )}
              <span className="user-name">{user.username}</span>
              {/* يمكنك تفعيل الدائرة الخضراء عند الحاجة */}
              {/* {onlineUsers.includes(user._id) && (
                <span className="online-dot">🟢</span>
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClinesChat;
