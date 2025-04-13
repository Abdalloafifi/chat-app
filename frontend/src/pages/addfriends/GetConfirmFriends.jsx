import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmFriends, ConfirmOrder } from '../redux/apicalls/messageapi';
import { socket } from '../../socket';
import { massActions } from '../redux/slices/messageslice';

const GetConfirmFriends = () => {
  const [onlineUsers, setOnlineUsers] = React.useState([]); // حالة لتخزين الأونلاين يوزرز
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.message.getConfirmFriends);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getConfirmFriends());
  }, [dispatch]);

  useEffect(() => {
    // استماع لحدث الأونلاين يوزرز من السيرفر
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users); // تحديث الحالة عند استلام بيانات الأونلاين يوزرز
    });

    return () => {
      socket.off('onlineUsers'); // تنظيف الـ event عند فك الاتصال
    };
  }, []);
  const handleConfirmOrder = (friendId) => {
    if (friendId) {
      dispatch(ConfirmOrder(friendId)).then(() => {
        // إزالة المستخدم محليًا
        dispatch(massActions.ConfirmFriends({ _id: friendId }));
      });
    }
  };
  const filteredUsers = Array.isArray(userList.FriendRequests)
    ? userList.FriendRequests.filter(u => u && u._id)
    : [];
  const sortedUsers = [...filteredUsers].sort((a, b) =>
    new Date(b.lastMessageTimestamp || 0) - new Date(a.lastMessageTimestamp || 0)
  );
  return (
    <div className="clines-chat-container">
      <div className="clines-chat-users ">
        {sortedUsers.length > 0 ? (
          sortedUsers.map((u) => (
            <div
              key={u._id}
              to={`/chat/${u._id}`}
              className="user-link"
            >
              <div className="user-item">
                {u.avatar && (
                  <img
                    src={u.avatar}
                    alt={`${u.username}'s avatar`}
                    className="user-avatar"
                  />
                )}
                <span className="user-name">{u.username}</span>
                {user._id === userList._id && (

                  <button
                    className="btn-edit-content"
                    onClick={() => handleConfirmOrder(u._id)}
                    style={{ width: "170px", height: "60px", padding: "0px" }}
                  >
                    I Can I try talking to him🙁
                  </button>
                )}
                {/* يمكنك تفعيل الدائرة الخضراء عند الحاجة */}
                {onlineUsers.includes(u._id) && (
                  <span className="online-dot">🟢</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="profile-description nav-link">
            You could have sent it to me and I wouldn't have been late.😁😁
          </div>
        )}
      </div>
    </div>
  );
};

export default GetConfirmFriends;
