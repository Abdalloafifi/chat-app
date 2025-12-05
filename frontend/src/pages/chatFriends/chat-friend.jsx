import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../redux/apicalls/messageapi';
import { socket, connectSocketManually } from '../../socket';
import ChatMessage from "../../components/Chat-message";
import '../chat/ChatStayle.css';

const ChatFriends = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // المستخدم المحدد للشات
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.message.getFriends);

  useEffect(() => {
    connectSocketManually();
    dispatch(getFriends());
  }, [dispatch]);

  useEffect(() => {
    const handleOnline = (users) => {
      console.log('Online users updated:', users);
      setOnlineUsers(users);
    };

    // الاستماع لحدث onlineUsers
    socket.on("onlineUsers", handleOnline);

    // طلب قائمة المستخدمين المتصلين عند التحميل
    socket.emit("getOnlineUsers");

    return () => {
      socket.off("onlineUsers", handleOnline);
    };
  }, []); // Empty dependency array - يعمل مرة واحدة عند mount

  // دالة لاختيار مستخدم للدردشة
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="all-chat-page">
      <div className="chat-page">
        {/* قائمة الأصدقاء */}
        <div className="chat-clines">
          <div className="clines-chat-container">
            <div className="clines-chat-users">
              {userList.length > 0 ? (
                userList
                  .filter(user => user && user._id)
                  .map((user) => {
                    const avatarUrl = user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.username || 'User') + '&background=008069&color=fff&size=128';
                    const isSelected = selectedUser?._id === user._id;

                    return (
                      <div
                        key={user._id}
                        className={`user-link ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectUser(user)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="user-item">
                          <img
                            src={avatarUrl}
                            alt={`${user.username}'s avatar`}
                            className="user-avatar"
                            onError={(e) => {
                              e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.username || 'User') + '&background=008069&color=fff&size=128';
                            }}
                          />
                          {onlineUsers.includes(user._id) && (
                            <span className="online-dot">🟢</span>
                          )}
                          <span className="user-name">{user.username}</span>
                          {user.lastMessage && (
                            <div className="last-message-preview">
                              <span className="message-text">
                                {user.lastMessage.senderId === user._id ? '' : 'أنت: '}
                                {user.lastMessage.text && user.lastMessage.text.length > 20
                                  ? user.lastMessage.text.substring(0, 20) + '...'
                                  : user.lastMessage.text || 'رسالة'}
                              </span>
                              {/* <span className="message-time">
                                {new Date(user.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span> */}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <h1>Do you have friends in your imagination or what?😂😂</h1>
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
                <h2>💬 اختر صديقاً لبدء المحادثة</h2>
                <p>اضغط على أي صديق من القائمة لبدء الدردشة</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatFriends;
