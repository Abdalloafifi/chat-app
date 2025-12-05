import { useState, useEffect, useRef, useCallback } from 'react';
import SimplePeer from 'simple-peer';
import { socket } from '../socket';
import { createCallRecord } from '../pages/redux/apicalls/messageapi';
import { useDispatch } from 'react-redux';

export const useWebRTC = (currentUserId) => {
    const dispatch = useDispatch();
    const callStartTimeRef = useRef(null);

    const [callState, setCallState] = useState({
        isCalling: false,
        isReceivingCall: false,
        callAccepted: false,
        callEnded: false,
        caller: null,
        callerSignal: null,
        callType: null, // 'audio' or 'video'
        stream: null,
        otherUserId: null,
    });

    // Use ref to access latest state in callbacks/effects
    const callStateRef = useRef(callState);
    useEffect(() => {
        callStateRef.current = callState;
    }, [callState]);

    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const connectionRef = useRef();
    const myVideo = useRef();
    const userVideo = useRef();

    const endCall = useCallback((isRemote = false) => {
        const state = callStateRef.current;

        // Calculate call duration
        let callDuration = 0;
        if (callStartTimeRef.current) {
            callDuration = Math.floor((Date.now() - callStartTimeRef.current) / 1000);
        }

        // Create call record if call was accepted
        if (state.callAccepted && (state.otherUserId || state.caller)) {
            const receiverId = state.otherUserId || state.caller;
            const callType = state.callType;
            dispatch(createCallRecord(receiverId, callType, callDuration, 'completed'));
        }

        if (connectionRef.current) {
            connectionRef.current.destroy();
            connectionRef.current = null;
        }

        // Stop all tracks in local stream
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop();
                track.enabled = false;
            });
            setLocalStream(null);
        }

        if (myVideo.current) myVideo.current.srcObject = null;
        if (userVideo.current) userVideo.current.srcObject = null;
        setRemoteStream(null);

        // Notify other user if we are in a call and it's not a remote termination
        if (!isRemote && state.callAccepted && !state.callEnded) {
            const targetId = state.otherUserId || state.caller;
            if (targetId) {
                socket.emit("call:end", { to: targetId });
            }
        }

        setCallState({
            isCalling: false,
            isReceivingCall: false,
            callAccepted: false,
            callEnded: true,
            caller: null,
            callerSignal: null,
            callType: null,
            stream: null,
            otherUserId: null,
        });

        callStartTimeRef.current = null;

        // Reset callEnded state after a short delay
        setTimeout(() => {
            setCallState(prev => ({ ...prev, callEnded: false }));
        }, 2000);
    }, [dispatch, localStream]);

    useEffect(() => {
        const handleIncomingCall = ({ from, callType, offer }) => {
            setCallState(prev => ({
                ...prev,
                isReceivingCall: true,
                caller: from,
                callerSignal: offer,
                callType
            }));
        };

        const handleCallAccepted = ({ answer }) => {
            setCallState(prev => ({ ...prev, callAccepted: true }));
            callStartTimeRef.current = Date.now();
            if (connectionRef.current) {
                connectionRef.current.signal(answer);
            }
        };

        const handleCallRejected = () => {
            alert("تم رفض المكالمة");
            endCall(true);
        };

        const handleCallEnded = () => {
            endCall(true);
        };

        const handleIceCandidate = ({ candidate }) => {
            if (connectionRef.current) {
                connectionRef.current.signal(candidate);
            }
        };

        socket.on("call:incoming", handleIncomingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("call:rejected", handleCallRejected);
        socket.on("call:ended", handleCallEnded);
        socket.on("call:ice-candidate", handleIceCandidate);

        // Handle window close/refresh
        const handleBeforeUnload = () => {
            const state = callStateRef.current;
            if (state.callAccepted && !state.callEnded) {
                const targetId = state.otherUserId || state.caller;
                if (targetId) {
                    socket.emit("call:end", { to: targetId });
                }
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            socket.off("call:incoming", handleIncomingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("call:rejected", handleCallRejected);
            socket.off("call:ended", handleCallEnded);
            socket.off("call:ice-candidate", handleIceCandidate);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [endCall]);

    const startCall = (id, type) => {
        navigator.mediaDevices.getUserMedia({ video: type === 'video', audio: true })
            .then((currentStream) => {
                setLocalStream(currentStream);
                if (myVideo.current) myVideo.current.srcObject = currentStream;

                const peer = new SimplePeer({
                    initiator: true,
                    trickle: false,
                    stream: currentStream,
                });

                peer.on("signal", (data) => {
                    socket.emit("call:start", {
                        to: id,
                        from: currentUserId,
                        callType: type,
                        offer: data,
                    });
                });

                peer.on("stream", (currentStream) => {
                    setRemoteStream(currentStream);
                    if (userVideo.current) userVideo.current.srcObject = currentStream;
                });

                connectionRef.current = peer;
                setCallState(prev => ({ ...prev, isCalling: true, callType: type, otherUserId: id }));
            })
            .catch((err) => {
                console.error("Error accessing media devices:", err);
                if (err.name === 'NotAllowedError') {
                    alert('⚠️ يرجى السماح بالوصول للكاميرا والميكروفون');
                } else {
                    alert('❌ حدث خطأ أثناء الوصول للكاميرا/الميكروفون');
                }
            });
    };

    const answerCall = () => {
        const callerId = callState.caller;
        setCallState(prev => ({ ...prev, callAccepted: true, otherUserId: callerId }));
        callStartTimeRef.current = Date.now();

        navigator.mediaDevices.getUserMedia({ video: callState.callType === 'video', audio: true })
            .then((currentStream) => {
                setLocalStream(currentStream);
                if (myVideo.current) myVideo.current.srcObject = currentStream;

                const peer = new SimplePeer({
                    initiator: false,
                    trickle: false,
                    stream: currentStream,
                });

                peer.on("signal", (data) => {
                    socket.emit("call:accept", { to: callState.caller, answer: data });
                });

                peer.on("stream", (currentStream) => {
                    setRemoteStream(currentStream);
                    if (userVideo.current) userVideo.current.srcObject = currentStream;
                });

                peer.signal(callState.callerSignal);
                connectionRef.current = peer;
            })
            .catch((err) => {
                console.error("Error accessing media devices:", err);
                alert('فشل الوصول إلى الكاميرا أو الميكروفون');
            });
    };

    const rejectCall = () => {
        socket.emit("call:reject", { to: callState.caller });
        setCallState(prev => ({
            ...prev,
            isReceivingCall: false,
            caller: null,
            callerSignal: null
        }));
    };

    return {
        callState,
        localStream,
        remoteStream,
        myVideo,
        userVideo,
        startCall,
        answerCall,
        rejectCall,
        endCall
    };
};