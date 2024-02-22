const AUDIO_STORAGE_KEY = 'lastAudio';

export const saveLastAudio = (src, currentTime) => {
  const data = JSON.stringify({ src, currentTime });
  localStorage.setItem(AUDIO_STORAGE_KEY, data);
};

export const getLastAudio = () => {
  const data = localStorage.getItem(AUDIO_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};
