import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import {
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
} from '../../store/auth';

const formData = {
  email: '',
  password: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'Correo electrónico inválido'],
  password: [
    (value) => value.length >= 6,
    'La contraseña debe tener al menos 6 caracteres',
  ],
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    email,
    password,
    onInputChange,
    formState,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      setFormSubmitted(true);
      return;
    }

    dispatch(startLoginWithEmailAndPassword(formState));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Iniciar sesión">
      <form
        aria-label="submit-form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="example@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted ? emailValid : null}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              InputProps={{
                'data-testid': 'password',
              }}
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted ? passwordValid : null}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2, mb: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                type="submit"
                fullWidth
              >
                <Typography variant="button">Iniciar sesión</Typography>
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                aria-label="google-btn"
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography variant="button" ml={1}>
                  Google
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Grid item mt={1}>
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear cuenta
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
