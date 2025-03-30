import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendMessage } from "../pages/redux/apicalls/messageapi";
import "./seend.css";

const SendMessagePage = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        setAudioBlob(new Blob(audioChunksRef.current, { type: "audio/wav" }));
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing audio:", err);
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (recording) await handleStopRecording();

    const formData = new FormData();
    formData.append("text", message);
    formData.append("receiverId", id);
    if (file) formData.append("file", file);
    if (audioBlob) {
      formData.append("audio", new File([audioBlob], "audio-message.wav", { type: "audio/wav" }));
    }

    try {
      await dispatch(sendMessage({ receiverId: id, formData }));
      setMessage("");
      setFile(null);
      setAudioBlob(null);
    } catch (error) {
      // يتم التعامل مع الخطأ في messageapi
    }
  };

  return (
    <form className="message-composer" onSubmit={handleSendMessage}>
      {recording && (
        <div className="recording-bar">
          <div className="recording-indicator"></div>
          <span>جاري التسجيل...</span>
          <i onClick={handleStopRecording} className="icon-btn send-btn">⏱</i>
        </div>
      )}

      <div className="input-container">
        <div className="icon-container left-icons">
          <div className="file-upload">
            <input
              type="file"
              id="attachment"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
              disabled={recording || audioBlob}
            />
            <label
              htmlFor="attachment"
              className="icon-btn"
              style={{ display: (recording || audioBlob) ? "none" : "block" }}
            >
              📎
            </label>
          </div>
          {!message && !file && !audioBlob && !recording && (
            <button
              type="button"
              onClick={handleStartRecording}
              className="icon-btn"
            >
              🎤
            </button>
          )}
        </div>

        <textarea
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب رسالتك..."
          style={{ display: recording ? "none" : "block" }}
        />

        <div
          className="icon-container right-icons"
          style={{ display: recording ? "none" : "flex" }}
        >
          {(message || file || audioBlob) ? (
            <button type="submit" className="icon-btn send-btn">
              ➤
            </button>
          ) : (
            <button type="button" className="icon-btn emoji-btn">
              😊
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SendMessagePage;