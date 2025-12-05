import React from 'react';
import './Header.css'; 
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';


const HeaderMessage = ({ onAudioCall, onVideoCall }) => {
  const { id } = useParams(); 
  const userList = useSelector((state) => state.message.commchat); 

  const user = userList.find(user => user._id === id); 

  return (
    <header className="chat-header">
      <div className="user-info">
        {user && (
          <Link className='user-link user-link-header ' to={`/profile/${user._id}`}>
            <img src={user.avatar} alt={`${user.username}'s avatar`} className="user-avatar" />
            <div className="user-details">
              <span className="user-name">{user.username}</span>
            </div>
          </Link>
        )}
      </div>
      <div className="header-icons">
        <button onClick={onAudioCall} className="icon-btn" title="مكالمة صوتية">
          <i className="icon phone-icon">📞</i>
        </button>
        <button onClick={onVideoCall} className="icon-btn" title="مكالمة فيديو">
          <i className="icon camera-icon">📷</i>
        </button>
      </div>
    </header>
  );
};

export default HeaderMessage;
