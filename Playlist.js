import React from 'react';

const Playlist = ({ tracks, onTrackClick }) => {
  return (
    <ul>
      {tracks.map((track, index) => (
        <li key={index} onClick={() => onTrackClick(index)}>
          {track.name}
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
