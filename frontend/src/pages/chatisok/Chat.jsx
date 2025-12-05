import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/apicalls/messageapi';
import { socket } from '../../socket';
import ChatMessage from "../../components/Chat-message";
import '../chat/ChatStayle.css';

const Chat = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // المستخدم المحدد للشات
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.message.getCline);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const handleOnlineUsers = (users) => {
      console.log('Online users updated:', users);
      setOnlineUsers(users);
    };

    // الاستماع لحدث onlineUsers
    socket.on('onlineUsers', handleOnlineUsers);

    // طلب قائمة المستخدمين المتصلين عند التحميل
    socket.emit("getOnlineUsers");

    return () => {
      socket.off('onlineUsers', handleOnlineUsers);
    };
  }, []);

  // دالة لاختيار مستخدم للدردشة
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="all-chat-page">
      <div className="chat-page">
        {/* قائمة المستخدمين */}
        <div className="chat-clines">
          <div className="clines-chat-container">
            <div className="clines-chat-users">
              {userList && userList.length > 0 ? (
                userList
                  .filter(u => u && u._id)
                  .map((u) => {
                    const avatarUrl = u.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.username || 'User') + '&background=008069&color=fff&size=128';
                    const isSelected = selectedUser?._id === u._id;

                    return (
                      <div
                        key={u._id}
                        className={`user-link ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectUser(u)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="user-item">
                          <img
                            src={avatarUrl}
                            alt={`${u.username}'s avatar`}
                            className="user-avatar"
                            onError={(e) => {
                              e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.username || 'User') + '&background=008069&color=fff&size=128';
                            }}
                          />
                          {onlineUsers.includes(u._id) && <span className="online-dot">🟢</span>}
                          <span className="user-name">{u.username}</span>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="profile-description text-muted mb-0">لا يوجد مستخدمين متاحين</p>
              )}
            </div>
          </div>
        </div>

        {/* منطقة الشات */}
        <div className="chat-containers">
          {selectedUser ? (
            <ChatMessage key={selectedUser._id} selectedUserId={selectedUser._id} />
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-content">
                <h2>💬 اختر مستخدماً لبدء المحادثة</h2>
                <p>اضغط على أي مستخدم من القائمة لبدء الدردشة</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;