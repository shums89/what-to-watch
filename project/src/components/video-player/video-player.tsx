import { useState, useEffect, useRef } from 'react';

import type { Film } from '../../types/film';

type VideoPlayerProps = Film & {
  isPlaying: boolean;
}

const VideoPlayer = ({ isPlaying, ...film }: VideoPlayerProps): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeoutId, setTimeoutId] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleDataLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const playerElement = videoRef.current;

    if (!playerElement) {
      return;
    }

    playerElement.addEventListener('loadeddata', handleDataLoaded);

    return () => {
      playerElement.removeEventListener('loadeddata', handleDataLoaded);
    };
  }, []);

  useEffect(() => {
    const playerElement = videoRef.current;
    let timerId: number;

    if (!isLoaded || !playerElement) {
      return;
    }

    if (isPlaying && timeoutId === 0) {
      timerId = window.setTimeout(() => {
        if (playerElement.paused) {
          playerElement.play();
        }
      }, 1000);
      setTimeoutId(timerId);
      return;
    }

    if (isPlaying) {
      return;
    }

    clearTimeout(timeoutId);
    setTimeoutId(0);
    playerElement.load();
  }, [isPlaying, isLoaded, timeoutId]);

  return (
    <video
      autoPlay={false}
      src={film.previewVideoLink}
      poster={film.previewImage}
      loop
      muted
      ref={videoRef}
      height="175"
      data-testid="video"
    />
  );
};

export default VideoPlayer;
