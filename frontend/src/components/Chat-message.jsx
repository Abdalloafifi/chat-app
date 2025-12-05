import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getmessageschat, likeMessage, deleteMessage, editMessage } from "../pages/redux/apicalls/messageapi";
import moment from 'moment';
import HeaderMessage from "./Heder-message";
import SendMessagePage from "./SendMessage";
import EditMessageModal from "./EditMessageModal";
import CallNotification from "./CallNotification";
import ActiveCall from "./ActiveCall";
import { useWebRTC } from "../hooks/useWebRTC";
import "./ChatMessage.css";
import { useNewMessage } from '../socket';
import useCallSounds from '../hooks/useCallSounds';
import { MdEdit, MdDelete, MdFavorite, MdFavoriteBorder, MdMoreHoriz, MdCall, MdVideocam, MdCallMissed, MdCallEnd } from 'react-icons/md';

const ChatMessage = ({ selectedUserId }) => {
  const location = useLocation();
  const { id: paramId } = useParams();
  const id = selectedUserId || paramId; // استخدام prop إذا كان موجود، وإلا استخدام param
  const dispatch = useDispatch();
  const messagesContainerRef = useRef(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messages = useSelector((state) => state.message.getMessages);
  const { userInfo } = useSelector((state) => state.auth);

  // جلب الرسائل
  useEffect(() => {
    if (id) {
      dispatch(getmessageschat(id));
    }
  }, [dispatch, id]);

  // التمرير التلقائي للأسفل عند تحميل الرسائل
  useEffect(() => {
    if (messagesContainerRef.current && messages && messages.length > 0) {
      // تأخير بسيط للتأكد من تحميل المحتوى
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages]);

  // التحقق من الحاجة لزر التمرير
  useEffect(() => {
    const checkScroll = () => {
      if (messagesContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isNearBottom);
      }
    };

    if (messagesContainerRef.current) {
      messagesContainerRef.current.addEventListener('scroll', checkScroll);
      checkScroll(); // تحقق أولي
    }

    return () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.message-options') && !event.target.closest('.options-toggle')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const showChatMessage = location.pathname !== '/chat';
  if (!showChatMessage) {
    return <div className="select-chat">اختر محادثة لبدء المراسلة</div>;
  }

  const {
    callState,
    localStream,
    remoteStream,
    myVideo,
    userVideo,
    startCall,
    answerCall,
    rejectCall,
    endCall
  } = useWebRTC(userInfo?._id);

  // Enable call sounds
  useCallSounds(callState);

  const handleAudioCall = () => {
    startCall(id, 'audio');
  };

  const handleVideoCall = () => {
    startCall(id, 'video');
  };

  const handleLike = (msgId) => {
    dispatch(likeMessage(msgId));
  };

  const handleDelete = (msgId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      dispatch(deleteMessage(msgId));
    }
  };

  // دالة محسنة لاستخراج الـ ID
  const extractId = (item) => {
    if (!item) return null;
    if (typeof item === 'string') return item;
    if (item._id) return item._id;
    return item.toString ? item.toString() : null;
  };

  const handleEdit = (msg) => {
    console.log("=== بدء التعديل ===");
    console.log("رسالة:", msg);
    console.log("userInfo:", userInfo);

    // استخراج الـ ID
    const senderId = extractId(msg.senderId);
    const currentUserId = extractId(userInfo?._id);

    console.log("senderId:", senderId);
    console.log("currentUserId:", currentUserId);
    console.log("المقارنة:", senderId === currentUserId ? "نعم" : "لا");

    // التحقق من أن الرسالة للمستخدم الحالي
    if (senderId !== currentUserId) {
      console.error("خطأ: المستخدم يحاول تعديل رسالة ليست له");
      alert("لا يمكنك تعديل رسائل الآخرين");
      return;
    }

    // التحقق من أن الرسالة نصية
    if (msg.image || msg.video || msg.audio || msg.isCallRecord) {
      alert("لا يمكن تعديل رسائل الوسائط أو سجلات المكالمات");
      return;
    }

    // التحقق من وجود نص
    if (!msg.text || msg.text.trim() === "") {
      alert("لا يمكن تعديل رسالة بدون نص");
      return;
    }

    console.log("الرسالة جاهزة للتعديل");
    setEditingMessage(msg);
    setActiveMenu(null);
  };

  const saveEdit = async (msgId, newText) => {
    try {
      console.log("جاري حفظ التعديل:", msgId, newText);
      await dispatch(editMessage(msgId, newText));
      setEditingMessage(null);
    } catch (error) {
      console.error("فشل تعديل الرسالة:", error);
      alert("فشل تعديل الرسالة: " + (error.response?.data?.message || "حدث خطأ"));
    }
  };

  const toggleMenu = (e, msgId) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveMenu(activeMenu === msgId ? null : msgId);
  };

  // دالة للتمرير للأسفل
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
      setShowScrollButton(false);
    }
  };

  return (
    <>
      <HeaderMessage onAudioCall={handleAudioCall} onVideoCall={handleVideoCall} />
      <CallNotification
        callState={callState}
        onAnswer={answerCall}
        onReject={rejectCall}
      />
      <ActiveCall
        callState={callState}
        localVideoRef={myVideo}
        remoteVideoRef={userVideo}
        onEndCall={endCall}
        localStream={localStream}
        remoteStream={remoteStream}
      />

      <div className="chat-container">
        {/* زر التمرير للأسفل */}
        {showScrollButton && (
          <button
            className="scroll-down-btn"
            onClick={scrollToBottom}
            title="التمرير للأسفل"
          >
            ↓
          </button>
        )}

        <div className="chat-messages" ref={messagesContainerRef}>
          {messages && messages.length === 0 ? (
            <div className="no-messages">
              <span>لا توجد رسائل بعد. ابدأ المحادثة الآن!</span>
            </div>
          ) : (
            messages && messages.map((message, index) => {
              // استخراج الـ ID بشكل صحيح
              const senderId = extractId(message.senderId);
              const currentUserId = extractId(userInfo?._id);

              const isMyMessage = senderId === currentUserId;
              const messageClass = isMyMessage ? 'sent' : 'received';
              const isLiked = message.like && message.like.includes(currentUserId);
              const likeCount = message.like ? message.like.length : 0;
              const hasMedia = message.image || message.video || message.audio;

              return (
                <div key={message._id || index} className={`message-wrapper ${messageClass}`}>
                  <div className={`message ${messageClass} ${hasMedia ? 'has-media' : ''}`}>
                    <div className="message-content">
                      {/* سجل المكالمة */}
                      {message.isCallRecord ? (
                        <div className="call-record">
                          <div className="call-icon">
                            {message.callType === 'video' ? (
                              <MdVideocam size={24} />
                            ) : (
                              <MdCall size={24} />
                            )}
                          </div>
                          <div className="call-info">
                            <span className="call-type">
                              مكالمة {message.callType === 'video' ? 'فيديو' : 'صوتية'}
                            </span>
                            {message.callDuration > 0 && (
                              <span className="call-duration">
                                {Math.floor(message.callDuration / 60)}:{(message.callDuration % 60).toString().padStart(2, '0')}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* محتوى الرسالة العادية */}
                          {message.image && (
                            <img
                              src={message.image}
                              alt="رسالة صورة"
                              className="media"
                              onClick={() => window.open(message.image, '_blank')}
                            />
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
                            <a
                              href={message.file}
                              download
                              className="file-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📎 تحميل الملف
                            </a>
                          )}
                          {message.text && <div className="text">{message.text}</div>}
                        </>
                      )}
                    </div>

                    <div className="message-footer">
                      <span className="time">
                        {moment(message.createdAt).format('HH:mm')}
                        {message.editedAt && <span className="edited-label"> (معدل)</span>}
                      </span>

                      {likeCount > 0 && (
                        <span
                          className="like-count"
                          onClick={() => handleLike(message._id)}
                          title={`${likeCount} إعجاب${likeCount > 1 ? 'ات' : ''}`}
                        >
                          <MdFavorite className="liked-icon-small" /> {likeCount}
                        </span>
                      )}
                    </div>

                    {/* قائمة الخيارات - دائماً ظاهرة */}
                    <div className="message-options">
                      <button
                        className="options-toggle"
                        onClick={(e) => toggleMenu(e, message._id)}
                        title="خيارات"
                      >
                        <MdMoreHoriz />
                      </button>

                      {activeMenu === message._id && (
                        <div className="options-menu" onClick={(e) => e.stopPropagation()}>
                          {/* زر الإعجاب */}
                          <button
                            onClick={() => {
                              handleLike(message._id);
                              setActiveMenu(null);
                            }}
                            className={isLiked ? 'liked-option' : ''}
                            title={isLiked ? "إزالة الإعجاب" : "إعجاب"}
                          >
                            {isLiked ? <MdFavorite /> : <MdFavoriteBorder />}
                          </button>

                          {/* زر التعديل - فقط لرسائلي النصية */}
                          {isMyMessage && !hasMedia && !message.isCallRecord && (
                            <button
                              onClick={() => handleEdit(message)}
                              title="تعديل الرسالة"
                              className="edit-option"
                            >
                              <MdEdit />
                            </button>
                          )}

                          {/* زر الحذف - فقط لرسائلي */}
                          {isMyMessage && (
                            <button
                              onClick={() => {
                                if (window.confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
                                  handleDelete(message._id);
                                  setActiveMenu(null);
                                }
                              }}
                              className="delete-option"
                              title="حذف الرسالة"
                            >
                              <MdDelete />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <SendMessagePage selectedUserId={id} />

      {editingMessage && (
        <EditMessageModal
          message={editingMessage}
          onClose={() => setEditingMessage(null)}
          onSave={saveEdit}
        />
      )}
    </>
  );
};

export default ChatMessage;