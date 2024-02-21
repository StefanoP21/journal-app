import { signInWithGoogle } from '../../firebase/provider';
import { ckeckingCredentials } from './';

export const checkingAuthentication = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(ckeckingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch, getState) => {
    dispatch(ckeckingCredentials());

    const result = await signInWithGoogle();
    console.log({ result });
  };
};
