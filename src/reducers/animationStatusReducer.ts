import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const playedBallInstructions = createAction('PLAYED_BALL_INSTRUCTIONS');
export const playedTriangleInstructions = createAction('PLAYED_TRIANGLE_INSTRUCTIONS');
export const playedGravityCircleInstructions = createAction(
  'PLAYED_GRAVITY_CIRCLE_INSTRUCTIONS'
);
export const playedOneShotRectangleInstructions = createAction(
  'PLAYED_ONE_SHOT_INSTRUCTIONS'
);
export const playedDroneHexagonInstructions = createAction(
  'PLAYED_DRONE_HEXAGON_INSTRUCTIONS'
);

export const playingBallInstructions = createAction<boolean>('PLAYING_BALL_INSTRUCTIONS');
export const playingTriangleInstructions = createAction<boolean>(
  'PLAYING_TRIANGLE_INSTRUCTIONS'
);
export const playingGravityCircleInstructions = createAction<boolean>(
  'PLAYING_GRAVITY_CIRCLE_INSTRUCTIONS'
);
export const playingOneShotRectangleInstructions = createAction<boolean>(
  'PLAYING_ONE_SHOT_RECTANGLE_INSTRUCTIONS'
);
export const playingDroneHexagonInstructions = createAction<boolean>(
  'PLAYING_DRONE_HEXAGON_INSTRUCTIONS'
);

interface HasAnimatedState {
  playedBallInstructions: boolean;
  playingBallInstructions: boolean;
  playedTriangleInstructions: boolean;
  playingTriangleInstructions: boolean;
  playedGravityCircleInstructions: boolean;
  playingGravityCircleInstructions: boolean;
  playedOneShotRectangleInstructions: boolean;
  playingOneShotRectangleInstructions: boolean;
  playedDroneHexagonInstructions: boolean;
  playingDroneHexagonInstructions: boolean;
}

const initialState: HasAnimatedState = {
  playedBallInstructions: false,
  playingBallInstructions: false,
  playedTriangleInstructions: false,
  playingTriangleInstructions: false,
  playedGravityCircleInstructions: false,
  playingGravityCircleInstructions: false,
  playedOneShotRectangleInstructions: false,
  playingOneShotRectangleInstructions: false,
  playedDroneHexagonInstructions: false,
  playingDroneHexagonInstructions: false,
};

export const animationStatusReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(playedBallInstructions, (state = initialState, action) => {
      state.playedBallInstructions = true;
    })
    .addCase(playedTriangleInstructions, (state = initialState, action) => {
      state.playedTriangleInstructions = true;
    })
    .addCase(playedGravityCircleInstructions, (state = initialState, action) => {
      state.playedGravityCircleInstructions = true;
    })
    .addCase(playedOneShotRectangleInstructions, (state = initialState, action) => {
      state.playedOneShotRectangleInstructions = true;
    })
    .addCase(playedDroneHexagonInstructions, (state = initialState, action) => {
      state.playedDroneHexagonInstructions = true;
    })
    .addCase(playingBallInstructions, (state = initialState, action) => {
      state.playingBallInstructions = action.payload;
    })
    .addDefaultCase((state, action) => {});
});
