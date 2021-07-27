import { createReducer, createAction, ActionCreator } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const playedBallInstructions = createAction('PLAYED_BALL_INSTRUCTIONS');
export const playedTriangleInstructions = createAction('PLAYED_TRIANGLE_INSTRUCTIONS');
export const playedGravityCircleInstructions = createAction('PLAYED_GRAVITY_CIRCLE_INSTRUCTIONS');
export const playedOneShotRectangleInstructions = createAction('PLAYED_ONE_SHOT_INSTRUCTIONS');
export const playedDroneHexagonInstructions = createAction('PLAYED_DRONE_HEXAGON_INSTRUCTIONS');

const initialState = {
  playedBallInstructions: false,
  playedTriangleInstructions: false,
  playedGravityCircleInstructions: false,
  playedOneShotRectangleInstructions: false,
  playedDroneHexagonInstructions: false,
};

export const playedInstructionsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(playedBallInstructions, (state: RootState, action) => {
      state.playedBallInstructions = true;
    })
    .addCase(playedTriangleInstructions, (state: RootState, action) => {
      state.playedTriangleInstructions = true;
    })
    .addCase(playedGravityCircleInstructions, (state: RootState, action) => {
      state.playedGravityCircleInstructions = true;
    })
    .addCase(playedOneShotRectangleInstructions, (state: RootState, action) => {
      state.playedOneShotInstructions = true;
    })
    .addCase(playedDroneHexagonInstructions, (state: RootState, action) => {
      state.playedDroneHexagonInstructions = true;
    })
})