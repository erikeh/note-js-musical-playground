import { combineReducers } from "redux"
import { currentlyPlayingReducer } from './currentlyPlayingReducer';
import { playedInstructionsReducer } from "./hasAnimatedReducer";

const rootReducer = combineReducers({
  currentlyPlaying: currentlyPlayingReducer,
  playedInstructions: playedInstructionsReducer,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>