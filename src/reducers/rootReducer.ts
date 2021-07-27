import { combineReducers } from 'redux';
import { playedInstructionsReducer } from './hasAnimatedReducer';

const rootReducer = combineReducers({
  playedInstructions: playedInstructionsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
