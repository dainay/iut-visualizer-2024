import { create } from "zustand";
import TRACKS from "./TRACKS";

const useStore = create((set) => ({
  // defaultTracks: TRACKS,

  // la liste processed par la librairie, et prête à être rendue dans le DOM
  tracks: [],
  setTracks: (_tracks) =>
    set(() => ({
      tracks: _tracks,
    })),

    currentTrackIndex: null,
    setCurrentTrackIndex: (index) => set(() => ({ currentTrackIndex: index })),
  
    isPlaying: false,
    setIsPlaying: (bool) => set(() => ({ isPlaying: bool })),

}));

export default useStore;
