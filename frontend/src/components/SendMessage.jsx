import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../pages/redux/apicalls/messageapi";
import EmojiPicker from 'emoji-picker-react';
import "./seend.css";

const SendMessage = ({ selectedUserId }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { id: paramId } = useParams();
  const id = selectedUserId || paramId; // استخدام prop إذا كان موجود، وإلا استخدام param
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const sendTypingIndicator = (isTyping) => {
    console.log(`${userInfo?.username} is ${isTyping ? 'typing...' : 'not typing'}`);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (value.trim() && !isTyping) {
      setIsTyping(true);
      sendTypingIndicator(true);
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    const newTimeout = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        sendTypingIndicator(false);
      }
    }, 1000);

    setTypingTimeout(newTimeout);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Error accessing audio:", err);
      alert("يجب السماح بالوصول إلى الميكروفون");
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleCancelRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setAudioBlob(null);
      audioChunksRef.current = [];
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxSize = 20 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        alert("الملف كبير جداً! الحد الأقصى هو 20MB");
        return;
      }

      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/webm', 'video/ogg',
        'audio/mpeg', 'audio/wav', 'audio/ogg'
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert("نوع الملف غير مدعوم. يُسمح بالصور والفيديوهات والملفات الصوتية فقط");
        return;
      }

      setFile(selectedFile);
      setAudioBlob(null);
      setShowEmojiPicker(false);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (recording) {
      await handleStopRecording();
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    if (!message.trim() && !file && !audioBlob) {
      alert("الرجاء إدخال نص أو رفع ملف أو تسجيل صوتي");
      return;
    }

    const formData = new FormData();

    if (message.trim()) {
      formData.append("text", message.trim());
    }

    if (file) {
      formData.append("file", file);
    }

    if (audioBlob) {
      formData.append("file", new File([audioBlob], `audio-message-${Date.now()}.wav`, { type: "audio/wav" }));
    }

    try {
      await dispatch(sendMessage({ receiverId: id, formData }));

      setMessage("");
      setFile(null);
      setAudioBlob(null);

      if (isTyping) {
        setIsTyping(false);
        sendTypingIndicator(false);
      }

      setShowEmojiPicker(false);

      if (textareaRef.current) {
        textareaRef.current.focus();
      }

    } catch (error) {
      console.error("فشل إرسال الرسالة:", error);
      alert("حدث خطأ أثناء إرسال الرسالة");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAudio = () => {
    setAudioBlob(null);
    audioChunksRef.current = [];
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && recording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <form className="message-composer" onSubmit={handleSendMessage}>
      {recording && (
        <div className="recording-bar">
          <div className="recording-indicator">
            <div className="pulse"></div>
            <span className="recording-text">🎤 جاري التسجيل...</span>
          </div>
          <div className="recording-controls">
            <button
              type="button"
              onClick={handleStopRecording}
              className="icon-btn stop-btn"
              title="إيقاف التسجيل"
            >
              ⏹️
            </button>
            <button
              type="button"
              onClick={handleCancelRecording}
              className="icon-btn cancel-btn"
              title="إلغاء التسجيل"
            >
              ❌
            </button>
          </div>
        </div>
      )}

      {file && !recording && (
        <div className="file-preview">
          <div className="file-info">
            <span className="file-name">📎 {file.name}</span>
            <span className="file-size">
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="remove-btn"
            title="إزالة الملف"
          >
            ✕
          </button>
        </div>
      )}

      {audioBlob && !recording && (
        <div className="audio-preview">
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <button
            type="button"
            onClick={handleRemoveAudio}
            className="remove-btn"
            title="إزالة التسجيل"
          >
            ✕
          </button>
        </div>
      )}

      <div className="input-container">
        <div className="icon-container left-icons">
          <div className="file-upload">
            <input
              ref={fileInputRef}
              type="file"
              id="attachment"
              onChange={handleFileSelect}
              hidden
              disabled={recording || audioBlob}
              accept="image/*,video/*,audio/*"
            />
            <label
              htmlFor="attachment"
              className={`icon-btn ${recording || audioBlob ? 'disabled' : ''}`}
              title="إرفاق ملف"
            >
              📎
            </label>
          </div>

          {!message.trim() && !file && !audioBlob && !recording && (
            <button
              type="button"
              onClick={handleStartRecording}
              className="icon-btn"
              title="تسجيل صوتي"
            >
              🎤
            </button>
          )}
        </div>

        <textarea
          ref={textareaRef}
          className="message-input"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالتك..."
          rows="1"
          style={{ display: recording ? "none" : "block" }}
          disabled={recording}
        />

        <div className="icon-container right-icons">
          {(!message.trim() && !file && !audioBlob && !recording) ? (
            <>
              <button
                type="button"
                className="icon-btn emoji-btn"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                title="إضافة إيموجي"
              >
                😊
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="icon-btn send-btn"
              title="إرسال الرسالة"
              disabled={recording}
            >
              ➤
            </button>
          )}
        </div>
      </div>

      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            searchDisabled={false}
            skinTonesDisabled={true}
            height={350}
            width="100%"
            previewConfig={{
              showPreview: false
            }}
          />
        </div>
      )}
    </form>
  );
};

export default SendMessage;