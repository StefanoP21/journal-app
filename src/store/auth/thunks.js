import {
  loginWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
  signOutFirebase,
} from '../../firebase/provider';
import { ckeckingCredentials, login, logout } from './';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(ckeckingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(ckeckingCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  displayName,
  email,
  password,
}) => {
  return async (dispatch) => {
    dispatch(ckeckingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailAndPassword({
        displayName,
        email,
        password,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ displayName, email, uid, photoURL }));
  };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(ckeckingCredentials());

    const result = await loginWithEmailAndPassword({
      email,
      password,
    });

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await signOutFirebase();

    dispatch(logout());
  };
};
