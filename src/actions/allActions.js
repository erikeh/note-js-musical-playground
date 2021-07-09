import { addSound, removeSound } from '../reducers/currentlyPlayingReducer';
import {
  playedBallInstructions,
  playedTriangleInstructions,
  playedGravityCircleInstructions,
  playedOneShotInstructions,
  playedDroneHexagonInstructions,
} from '../reducers/hasAnimatedReducer';

const allActions = {
  addSound,
  removeSound,
  playedBallInstructions,
  playedTriangleInstructions,
  playedGravityCircleInstructions,
  playedOneShotInstructions,
  playedDroneHexagonInstructions,
}

export default allActions