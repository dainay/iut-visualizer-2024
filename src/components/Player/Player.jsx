import { useEffect } from "react";
import useStore from "../../utils/store";
import audioController from "../../utils/AudioController";
import s from "./Player.module.scss";

const Player = () => {
  const {
    tracks,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
  } = useStore();

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (currentTrack) {
      audioController.play(currentTrack.preview);
      setIsPlaying(true);
    }
  }, [currentTrackIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioController.pause();
      setIsPlaying(false);
    } else {
      audioController.resume();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    audioController.setOnEnded(() => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setIsPlaying(false);
      }
    });
  }, [currentTrackIndex, tracks]);
  

  const nextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className={s.player}>
      <img src={currentTrack.album.cover_xl} alt="" className={s.cover} />
      <div className={s.info}>
        <h3>{currentTrack.title}</h3>
      </div>
      <div className={s.controls}>
        <button onClick={prevTrack}>⏮</button>
        <button onClick={togglePlayPause}>{isPlaying ? "⏸" : "▶️"}</button>
        <button onClick={nextTrack}>⏭</button>
      </div>
    </div>
  );
};

export default Player;
