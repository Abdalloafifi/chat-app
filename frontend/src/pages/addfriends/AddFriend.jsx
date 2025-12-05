import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, addFriends } from '../redux/apicalls/messageapi';
import "../../components/clinesChat.css";
import { socket } from '../../socket';
import { massActions } from '../redux/slices/messageslice';

const AddFriend = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.message.getUsers);
  const { user } = useSelector((state) => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // جلب المستخدمين عند تحميل الصفحة
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // الاشتراك في حدث المستخدمين المتصلين من السيرفر
  useEffect(() => {
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off('onlineUsers');
    };
  }, []);
  const handleAddFriend = useCallback((friendId) => {
    if (user && friendId) {
      dispatch(addFriends({ friendId })).then(() => {
        // إزالة المستخدم محليًا
        dispatch(massActions.addFriends({ _id: friendId }));
      });
    }
  }, [dispatch, user]);

  // التأكد من صحة بيانات المستخدمين وترتيبهم حسب آخر رسالة
  const filteredUsers = Array.isArray(userList)
    ? userList.filter(u => u && u._id)
    : [];
  const sortedUsers = [...filteredUsers].sort((a, b) =>
    new Date(b.lastMessageTimestamp || 0) - new Date(a.lastMessageTimestamp || 0)
  );

  return (
    <div className="clines-chat-container">
      <div className="clines-chat-users">
        {sortedUsers.length > 0 ? (
          sortedUsers.map(u => {
            // صورة افتراضية إذا لم تكن موجودة
            const avatarUrl = u.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.username || 'User') + '&background=008069&color=fff&size=128';

            return (
              <div key={u._id} className="user-link">
                <div className="user-item">
                  <img
                    src={avatarUrl}
                    alt={`${u.username}'s avatar`}
                    className="user-avatar"
                    onError={(e) => {
                      // إذا فشل تحميل الصورة، استخدم الصورة الافتراضية
                      e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.username || 'User') + '&background=008069&color=fff&size=128';
                    }}
                  />
                  {onlineUsers.includes(u._id) && <span className="online-dot">🟢</span>}
                  <span className="user-name">{u.username}</span>
                  <button
                    className="btn-edit-content"
                    onClick={() => handleAddFriend(u._id)}
                  >
                    إضافة صديق
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className=' profile-description text-muted mb-0'>Do you want to gather the people of the earth as your friends?🙄🤔</p>
        )}
      </div>
    </div>
  );
};

export default AddFriend;
