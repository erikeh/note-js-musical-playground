import { combineReducers } from 'redux';
import { animationStatusReducer } from './animationStatusReducer';

const rootReducer = combineReducers({
  animationStatus: animationStatusReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
