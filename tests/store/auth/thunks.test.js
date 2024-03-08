import {
  loginWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
  signOutFirebase,
} from '../../../src/firebase/provider';
import {
  ckeckingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startCreatingUserWithEmailAndPassword,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { testUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/provider.js');

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe de invocar el checking credentials', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(ckeckingCredentials());
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {
    const loginData = { ok: true, ...testUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(ckeckingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y logout', async () => {
    const loginData = { ok: false, errorMessage: 'Test error' };
    await signInWithGoogle.mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(ckeckingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login', async () => {
    const loginData = { ok: true, ...testUser };
    const formData = { email: testUser.email, password: '123456' };

    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(ckeckingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y logout', async () => {
    const loginData = { ok: false, errorMessage: 'Test error' };
    const formData = { email: testUser.email, password: '123456' };

    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(ckeckingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test('startCreatingUserWithEmailAndPassword debe de llamar checkingCredentials y login', async () => {
    const loginData = { ok: true, ...testUser };
    const formData = {
      displayName: testUser.displayName,
      email: testUser.email,
      password: '123456',
    };

    await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(ckeckingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(testUser));
  });

  test('startCreatingUserWithEmailAndPassword debe de llamar checkingCredentials y logout', async () => {
    const loginData = { ok: false, errorMessage: 'Test error' };
    const formData = {
      displayName: testUser.displayName,
      email: testUser.email,
      password: '123456',
    };

    await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(ckeckingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  test('startLogout debe de llamar clearNotesLogout y logout', async () => {
    await signOutFirebase.mockResolvedValue();

    await startLogout()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
