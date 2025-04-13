import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/apicalls/messageapi';
import "../../components/clinesChat.css";
import { Link } from 'react-router-dom';
import { socket } from '../../socket';

const ClinesChat = () => {
  const [onlineUsers, setOnlineUsers] = React.useState([]); // حالة لتخزين الأونلاين يوزرز
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.message.allClin);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
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

  // التأكد أن userList ليست null وأنها مصفوفة ثم ترتيبها
  const sortedUsers = userList && userList.length > 0
    ? [...userList].sort(
        (a, b) =>
          new Date(b.lastMessageTimestamp || 0) - new Date(a.lastMessageTimestamp || 0)
      )
    : [];
  
  // تصفية العناصر التي ليست null لتجنب الأخطاء أثناء التكرار
  const filteredUsers = sortedUsers.filter(user => user);

  return (
    <div className="clines-chat-container">
      <div className="clines-chat-users ">
        {user.isok ? (
          filteredUsers.map((user) => (
            <Link key={user._id} to={`/chat/${user._id}`} className="user-link">
              <div className="user-item">
                {user.avatar && (
                  <img src={user.avatar} alt={`${user.username}'s avatar`} className="user-avatar" />
                )}
                {onlineUsers.includes(user._id) && (
                  <span className="online-dot">🟢</span>
                )}
                <span className="user-name">{user.username}</span>
                {/* يمكنك تفعيل الدائرة الخضراء عند الحاجة */}
              </div>
            </Link>
          ))
        ) : (
          <div className='profile-description nav-link'>
            <Link to={`/profile/${user._id}`}>
              Do you want to communicate without being seen?🤨😑
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinesChat;
