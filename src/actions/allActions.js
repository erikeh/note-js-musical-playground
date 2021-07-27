import { addSound, removeSound } from '../reducers/currentlyPlayingReducer';
import {
  playedBallInstructions,
  playedTriangleInstructions,
  playedGravityCircleInstructions,
  playedOneShotRectangleInstructions,
  playedDroneHexagonInstructions,
} from '../reducers/hasAnimatedReducer';

const allActions = {
  addSound,
  removeSound,
  playedBallInstructions,
  playedTriangleInstructions,
  playedGravityCircleInstructions,
  playedOneShotRectangleInstructions,
  playedDroneHexagonInstructions,
}

export default allActions
