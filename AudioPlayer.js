import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ src, onEnded }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', onEnded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', onEnded);
      }
    };
  }, [onEnded]);

  return <audio ref={audioRef} controls src={src} />;
};

export default AudioPlayer;
