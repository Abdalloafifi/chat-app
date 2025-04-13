import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../redux/apicalls/messageapi';
import { Link } from 'react-router-dom';
import { socket, connectSocketManually } from '../../socket';

const ChatFriends = () => {

  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.message.getFriends);

  useEffect(() => {
    connectSocketManually();

    dispatch(getFriends());
  }, [dispatch]);

  useEffect(() => {
    const handleOnline = (users) => {
      setOnlineUsers(users);
    };

    if (socket.connected) {
      socket.on("onlineUsers", handleOnline);
    } else {
      socket.once("connect", () => {
        socket.on("onlineUsers", handleOnline);
      });
    }

    return () => {
      socket.off("onlineUsers", handleOnline);
    };
  }, []);


  return (
    <div className="clines-chat-container">
      <div className="clines-chat-users">
        {userList.length > 0 ? (
          userList
            .filter(user => user && user._id) // <-- هنا الفلترة
            .map((user) => (
              <Link key={user._id} to={`/chat-Friend/${user._id}`} className="user-link">
                <div className="user-item">
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={`${user.username}'s avatar`}
                      className="user-avatar"
                    />

                  )}
                  {onlineUsers.includes(user._id) && (
                    <span className="online-dot">🟢</span>
                  )}
                  <span className="user-name">{user.username}</span>

                </div>
              </Link>
            ))
        ) : (
          <h1>Do you have friends in your imagination or what?😂😂</h1>
        )}
      </div>
    </div>
  );
};

export default ChatFriends;
