import { combineReducers } from "redux"
import { currentlyPlayingReducer } from './currentlyPlayingReducer';

const rootReducer = combineReducers({
  currentlyPlaying: currentlyPlayingReducer,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>