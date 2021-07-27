import { createReducer, createAction, ActionCreator } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const addMethod = createAction('ADD_METHOD');

const initialState: RootState | undefined = {};

export const newBodyMethodsReducer = createReducer(initialState, (builder) => {
  builder.addCase(addMethod, (state: RootState, action) => {
    state[action.payload.methodName] = action.payload.method;
  });
});
