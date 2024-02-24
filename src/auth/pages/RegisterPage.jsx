import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

const formData = {
  displayName: 'Stefano Palomino',
  email: 'stefano@gmail.com',
  password: '123456',
};

const formValidations = {
  displayName: [(value) => !!value, 'El nombre es requerido'],
  email: [(value) => value.includes('@'), 'Correo electrónico inválido'],
  password: [
    (value) => value.length >= 6,
    'La contraseña debe tener al menos 6 caracteres',
  ],
};

export const RegisterPage = () => {
  const { displayName, email, password, onInputChange, formState } = useForm(
    formData,
    formValidations
  );

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ formState });
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Stefano Palomino"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="stefanop21@outlook.es"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="********"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2, mb: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                <Typography variant="button">Registrarse</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }} color="text.secondary">
              ¿Ya tienes una cuenta?
            </Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
