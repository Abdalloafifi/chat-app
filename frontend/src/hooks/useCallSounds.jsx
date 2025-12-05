import { useEffect, useRef } from 'react';

const useCallSounds = (callState) => {
    const incomingSound = useRef(new Audio('https://upload.wikimedia.org/wikipedia/commons/c/cd/Telephone_Ring_-_Sound_Effect.ogg'));
    const outgoingSound = useRef(new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e1/Phone_dialing_sound_effect.ogg')); // Placeholder for dialing sound

    useEffect(() => {
        // Configure sounds
        incomingSound.current.loop = true;
        outgoingSound.current.loop = true;

        // Handle Incoming Call (Ringing)
        if (callState.isReceivingCall && !callState.callAccepted && !callState.callEnded) {
            incomingSound.current.play().catch(e => console.log("Audio play failed:", e));
        } else {
            incomingSound.current.pause();
            incomingSound.current.currentTime = 0;
        }

        // Handle Outgoing Call (Dialing)
        if (callState.isCalling && !callState.callAccepted && !callState.callEnded) {
            outgoingSound.current.play().catch(e => console.log("Audio play failed:", e));
        } else {
            outgoingSound.current.pause();
            outgoingSound.current.currentTime = 0;
        }

        // Cleanup on unmount
        return () => {
            incomingSound.current.pause();
            incomingSound.current.currentTime = 0;
            outgoingSound.current.pause();
            outgoingSound.current.currentTime = 0;
        };
    }, [callState.isReceivingCall, callState.isCalling, callState.callAccepted, callState.callEnded]);

    return null; // This hook doesn't return anything, just manages side effects
};

export default useCallSounds;
