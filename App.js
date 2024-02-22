import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import Playlist from './Playlist';
import { saveLastAudio, getLastAudio } from './audioService';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleAudioEnded = () => {
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
  };

  const handleAudioTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleFileChange = (e) => {
    const newTracks = [...tracks];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const trackObject = {
        name: file.name,
        src: URL.createObjectURL(file),
      };
      newTracks.push(trackObject);
    }

    setTracks(newTracks);
  };

  useEffect(() => {
    const lastAudio = getLastAudio();
    if (lastAudio && lastAudio.src === tracks[currentTrackIndex]?.src) {
      setCurrentTime(lastAudio.currentTime);
    } else {
      setCurrentTime(0);
    }
  }, [currentTrackIndex, tracks]);

  useEffect(() => {
    saveLastAudio(tracks[currentTrackIndex]?.src, currentTime);
  }, [currentTrackIndex, currentTime, tracks]);

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} multiple />
      {tracks.length > 0 && (
        <>
          <AudioPlayer
            src={tracks[currentTrackIndex]?.src}
            onEnded={handleAudioEnded}
            onTimeUpdate={handleAudioTimeUpdate}
          />
          <Playlist tracks={tracks} onTrackClick={handleTrackClick} />
        </>
      )}
    </div>
  );
};

export default App;
