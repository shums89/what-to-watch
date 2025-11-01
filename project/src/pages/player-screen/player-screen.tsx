import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction } from '../../store/api-actions';
import { getFilm, getIsFilmLoading } from '../../store/film-data/selectors';
import browserHistory from '../../browser-history';
import Spinner from '../../components/spinner/spinner';

export const formatTime = (totalSeconds: number) => {
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor((totalSeconds / 60) % 24);

  return `${hours > 0 ? `0${hours}:`.slice(-3) : ''}${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
};

const PlayerScreen = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [time, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const params = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isFilmDataLoading = useAppSelector(getIsFilmLoading);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleDataLoaded = () => {
    setIsLoaded(true);
  };

  const handleTimeUpdate = () => {
    const playerElement = videoRef.current;

    if (!playerElement) {
      return;
    }

    setTime(Math.round(playerElement?.currentTime * 100 / playerElement?.duration));
    setTimeLeft(Math.round(playerElement?.duration - playerElement?.currentTime));
    if (playerElement.paused) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const { id } = params;
    if (id) {
      const parsedId = Number(id);
      dispatch(fetchFilmAction(parsedId));
    }
  }, [params, dispatch]);

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

    if (!isLoaded || !playerElement) {
      return;
    }

    playerElement.addEventListener('timeupdate', handleTimeUpdate);

    if (isFullscreen) {
      playerElement.requestFullscreen();
    }

    if (isPlaying) {
      if (playerElement.paused) {
        playerElement.play();
      }
      return;
    }

    playerElement.pause();

    return () => {
      playerElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isPlaying, isLoaded, isFullscreen]);


  if (isFilmDataLoading || !film) {
    return <Spinner />;
  }

  const { videoLink, previewImage, name } = film;

  return (
    <div className="player">
      <Helmet>
        <title>WTW. {name}</title>
      </Helmet>
      <video
        className="player__video"
        autoPlay
        src={videoLink}
        poster={previewImage}
        muted={false}
        ref={videoRef}
      />

      <button type="button" className="player__exit" onClick={() => browserHistory.back()}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={time} max="100"></progress>
            <div className="player__toggler" style={{ left: `${time}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{formatTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying
              ? (
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21"><use xlinkHref="#pause"></use></svg>
                  <span>Pause</span>
                </>)
              : (
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19"><use xlinkHref="#play-s"></use></svg>
                  <span>Play</span>
                </>)}
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen" onClick={() => setIsFullscreen(!isFullscreen)}>
            <svg viewBox="0 0 27 27" width="27" height="27"><use xlinkHref="#full-screen"></use></svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
