import {
  authSlice,
  ckeckingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
  testUser,
} from '../../fixtures/authFixtures';

describe('Pruebas en el authSlice', () => {
  test('debe de regresar el estado inicial y llamarse "auth"', () => {
    expect(authSlice.name).toBe('auth');

    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('debe de realizar la autenticación', () => {
    const state = authSlice.reducer(initialState, login(testUser));

    expect(state).toEqual(authenticatedState);
  });

  test('debe de realizar el logout sin argumentos', () => {
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage: null })
    );

    expect(state).toEqual(notAuthenticatedState);
  });

  test('debe de realizar el logout con argumentos', () => {
    const errorMessage = 'Test error';
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  });

  test('debde de cambiar el estado a checking', () => {
    const state = authSlice.reducer(
      notAuthenticatedState,
      ckeckingCredentials()
    );

    expect(state.status).toBe('checking');
  });
});
