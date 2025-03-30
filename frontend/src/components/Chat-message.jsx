import React, { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getmessageschat } from "../pages/redux/apicalls/messageapi";
import moment from 'moment';
import HeaderMessage from "./Heder-message";
import SendMessagePage from "./SendMessage";
import "./ChatMessage.css";

const ChatMessage = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const messagesContainerRef = useRef(null);

  const messages = useSelector((state) => state.message.getMessages);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getmessageschat(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const showChatMessage = location.pathname !== '/chat';
  if (!showChatMessage) {
    return <div className="select-chat">اختر محادثة لبدء المراسلة</div>;
  }

  return (
    <>
      <HeaderMessage />
      <div className="chat-container">
        <div className="chat-messages" ref={messagesContainerRef}>
          {messages && messages.map(message => {
            const messageClass = message.receiverId?._id === id ? 'sent' : 'received';
            return (
              <div key={message._id} className={`message ${messageClass}`}>
                <div className="sender">
                  {/* {message.senderId._id === userInfo?._id ? 'أنت' : message.senderId.username} */}
                </div>
                <div className="message-content">
                  {message.image && (
                    <img src={message.image} alt="رسالة صورة" className="media" />
                  )}
                  {message.video && (
                    <video controls className="media">
                      <source src={message.video} type="video/mp4" />
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                  )}
                  {message.audio && (
                    <audio controls className="media">
                      <source src={message.audio} type="audio/wav" />
                      متصفحك لا يدعم تشغيل الصوت.
                    </audio>
                  )}
                  {message.file && (
                    <a href={message.file} download className="file-link">تحميل الملف</a>
                  )}
                  {message.text && <div className="text">{message.text}</div>}
                </div>
                <div className="time">
                  {moment(message.createdAt).format('HH:mm')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SendMessagePage />
    </>
  );
};

export default ChatMessage;