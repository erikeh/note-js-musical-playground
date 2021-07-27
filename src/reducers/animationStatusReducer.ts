import { createReducer, createAction } from '@reduxjs/toolkit';

export const playedCircleInstructions = createAction('PLAYED_Circle_INSTRUCTIONS');
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

export const playingCircleInstructions = createAction<boolean>(
  'PLAYING_CIRCLE_INSTRUCTIONS'
);
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
  playedCircleInstructions: boolean;
  playingCircleInstructions: boolean;
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
  playedCircleInstructions: false,
  playingCircleInstructions: false,
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
    .addCase(playedCircleInstructions, (state = initialState, action) => {
      state.playedCircleInstructions = true;
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
    .addCase(playingCircleInstructions, (state = initialState, action) => {
      state.playingCircleInstructions = action.payload;
    })
    .addCase(playingTriangleInstructions, (state = initialState, action) => {
      state.playingTriangleInstructions = action.payload;
    })
    .addCase(playingGravityCircleInstructions, (state = initialState, action) => {
      state.playingGravityCircleInstructions = action.payload;
    })
    .addCase(playingDroneHexagonInstructions, (state = initialState, action) => {
      state.playingDroneHexagonInstructions = action.payload;
    })
    .addCase(playingOneShotRectangleInstructions, (state = initialState, action) => {
      state.playingOneShotRectangleInstructions = action.payload;
    })

    .addDefaultCase((state, action) => {});
});
