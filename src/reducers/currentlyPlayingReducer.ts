import { createReducer, createAction, ActionCreator } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const addSound = createAction('ADD_SOUND')
export const removeSound = createAction('REMOVE_SOUND')

const initialState = [];

export const currentlyPlayingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addSound, (state: RootState, action) => {
      state.push(action.payload);
    })
    .addCase(removeSound, (state: RootState, action) => {
      state = state.pop();
    })
})

// export const currentlyPlayingReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_SOUND':
//       return [...state, action.payload]
//     case 'REMOVE_SOUND':
//       return []
//     default:
//       return state;
//   }
// }