import { createReducer, createAction, ActionCreator } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const playedBallInstructions = createAction('PLAYED_BALL_INSTRUCTIONS');
export const playedTriangleInstructions = createAction('PLAYED_TRIANGLE_INSTRUCTIONS');
export const playedGravityCircleInstructions = createAction('PLAYED_GRAVITY_CIRCLE_INSTRUCTIONS');
export const playedOneShotRectangleInstructions = createAction('PLAYED_ONE_SHOT_INSTRUCTIONS');
export const playedDroneHexagonInstructions = createAction('PLAYED_DRONE_HEXAGON_INSTRUCTIONS');

interface HasAnimatedState {
  playedBallInstructions: boolean;
  playedTriangleInstructions: boolean;
  playedGravityCircleInstructions: boolean;
  playedOneShotRectangleInstructions: boolean;
  playedDroneHexagonInstructions: boolean;
}

const initialState: HasAnimatedState = {
  playedBallInstructions: false,
  playedTriangleInstructions: false,
  playedGravityCircleInstructions: false,
  playedOneShotRectangleInstructions: false,
  playedDroneHexagonInstructions: false,
};

export const playedInstructionsReducer = createReducer(initialState, (builder) => {
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
})