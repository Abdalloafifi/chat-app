import React from 'react';
import { MdCall, MdVideocam, MdCallEnd } from 'react-icons/md';
import './CallComponents.css';

import { useSelector } from 'react-redux';

const CallNotification = ({ callState, onAnswer, onReject }) => {
    const { allClin } = useSelector((state) => state.message);

    // Find caller details
    const callerDetails = allClin?.find(user => user._id === callState.caller);
    const callerName = callerDetails?.username || "مستخدم غير معروف";
    const callerAvatar = callerDetails?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(callerName) + '&background=random';

    if (!callState.isReceivingCall || callState.callAccepted) return null;

    return (
        <div className="call-notification-overlay">
            <div className="call-notification-card">
                <div className="caller-info">
                    <div className="caller-avatar-container">
                        <img src={callerAvatar} alt={callerName} className="caller-img" />
                    </div>
                    <h3>مكالمة {callState.callType === 'video' ? 'فيديو' : 'صوتية'} واردة</h3>
                    <p className="caller-name">{callerName}</p>
                </div>
                <div className="call-actions">
                    <button onClick={onReject} className="reject-btn" title="رفض">
                        <MdCallEnd size={24} />
                    </button>
                    <button onClick={onAnswer} className="answer-btn" title="رد">
                        {callState.callType === 'video' ? <MdVideocam size={24} /> : <MdCall size={24} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallNotification;
