import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
    uid: null,
    email: null,
    displayedName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, action) => {},

    logout: (state, payload) => {},

    ckeckingCredentials: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, ckeckingCredentials } = authSlice.actions;
