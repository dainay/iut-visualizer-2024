import audioController from "../../utils/AudioController";
import scene from "../../webgl/Scene";
import s from "./Track.module.scss"; 
import useStore from "../../utils/store";

const Track = ({ title, cover, src, duration, artists, index }) => {

  const { currentTrackIndex, setCurrentTrackIndex } = useStore();  

  const getSeconds = () => {
    const minutes = Math.floor(duration / 60);
    let seconds = Math.round(duration - minutes * 60);

    

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  };

  const onClick = () => {
    audioController.play(src);
    scene.cover.setCover(cover);
    setCurrentTrackIndex(index);
    scene.cover.setCover(cover);
  };

  return (
    <div 
    className={`${s.track} ${index === currentTrackIndex ? s.active :""}`} 
    onClick={onClick}>
      <span className={s.order}>{index + 1}</span>
      <div className={s.title}>
        <img src={cover} alt="" className={s.cover} />
        <div className={s.details}>
          <span className={s.trackName}>{title}</span>
          {/* {artists.map((artist, i) => (
            <span key={artist + i} className={s.artistName}>
              {artist}
            </span>
          ))} */}
        </div>
      </div>
      <span className={s.duration}>{getSeconds()}</span>
    </div>
  );
};

export default Track;
