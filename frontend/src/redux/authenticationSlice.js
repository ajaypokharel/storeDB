// authenticationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userId: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
    resetState: (state) => {
      state = initialState; 
    },
  },
});

export const { login, logout, resetState } = authenticationSlice.actions;

export default authenticationSlice.reducer;
