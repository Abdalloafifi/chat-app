import React, { useState, useEffect } from 'react';
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdCallEnd } from 'react-icons/md';
import './CallComponents.css';

const ActiveCall = ({
    callState,
    localVideoRef,
    remoteVideoRef,
    onEndCall,
    localStream,
    remoteStream
}) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream, localVideoRef]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream, remoteVideoRef]);

    // Toggle mute/unmute
    const toggleMute = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    // Toggle video on/off
    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    if ((!callState.isCalling && !callState.callAccepted) || callState.callEnded) return null;

    return (
        <div className="active-call-overlay">
            <div className="video-container">
                <video
                    playsInline
                    ref={remoteVideoRef}
                    autoPlay
                    className={`remote-video ${callState.callType === 'audio' ? 'hidden-media' : ''}`}
                />
                <video
                    playsInline
                    muted
                    ref={localVideoRef}
                    autoPlay
                    className={`local-video ${callState.callType === 'audio' || isVideoOff ? 'hidden-media' : ''}`}
                />

                {(callState.callType === 'audio' || isVideoOff) && (
                    <div className="audio-call-placeholder">
                        <div className="avatar-large">
                            {callState.callType === 'audio' ? '👤' : '📹'}
                        </div>
                        <h3>
                            {callState.callAccepted
                                ? (callState.callType === 'audio' ? 'مكالمة صوتية جارية...' : 'الكاميرا متوقفة')
                                : (callState.isReceivingCall ? 'مكالمة واردة...' : 'جاري الاتصال...')}
                        </h3>
                        <p className="call-status">
                            {callState.callAccepted ? '00:00' : (callState.isReceivingCall ? 'يرن...' : 'جاري الاتصال...')}
                        </p>
                    </div>
                )}
            </div>

            <div className="call-controls">
                {/* زر Mute/Unmute */}
                <button
                    className={`control-btn ${isMuted ? 'muted' : ''}`}
                    onClick={toggleMute}
                    title={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
                >
                    {isMuted ? <MdMicOff size={24} /> : <MdMic size={24} />}
                </button>

                {/* زر إنهاء المكالمة */}
                <button className="control-btn end-call-btn" onClick={onEndCall}>
                    <MdCallEnd size={30} />
                </button>

                {/* زر تشغيل/إيقاف الكاميرا (للفيديو فقط) */}
                {callState.callType === 'video' && (
                    <button
                        className={`control-btn ${isVideoOff ? 'video-off' : ''}`}
                        onClick={toggleVideo}
                        title={isVideoOff ? 'تشغيل الكاميرا' : 'إيقاف الكاميرا'}
                    >
                        {isVideoOff ? <MdVideocamOff size={24} /> : <MdVideocam size={24} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ActiveCall;
