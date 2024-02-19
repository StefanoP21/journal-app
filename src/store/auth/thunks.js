import { ckeckingCredentials } from './';

export const checkingAuthentication = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(ckeckingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch, getState) => {
    console.log('Google sign in');
    dispatch(ckeckingCredentials());
  };
};
