import { addSound, removeSound } from '../reducers/currentlyPlayingReducer';
import {
  playedBallInstructions,
  playedTriangleInstructions,
  playedGravityCircleInstructions,
  playedOneShotRectangleInstructions,
  playedDroneHexagonInstructions,
  playingBallInstructions,
  playingTriangleInstructions,
  playingGravityCircleInstructions,
} from '../reducers/hasAnimatedReducer';

const allActions = {
  addSound,
  removeSound,
  playedBallInstructions,
  playedTriangleInstructions,
  playedGravityCircleInstructions,
  playedOneShotRectangleInstructions,
  playedDroneHexagonInstructions,
  playingBallInstructions,
  playingTriangleInstructions,
  playingGravityCircleInstructions,
}

export default allActions;
