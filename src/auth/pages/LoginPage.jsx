import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

export const LoginPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2 }}
      >
        <Typography variant="h4" textAlign="center" sx={{ mb: 1 }}>
          Iniciar sesión
        </Typography>

        <form>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo electrónico"
                type="email"
                placeholder="example@gmail.com"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="********"
                fullWidth
              />
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2, mb: 1 }}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" type="submit" fullWidth>
                  <Typography variant="button">Iniciar sesión</Typography>
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth>
                  <Google />
                  <Typography variant="button" ml={1}>
                    Google
                  </Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Grid item mt={1}>
                <Link
                  component={RouterLink}
                  color="inherit"
                  to="/auth/register"
                >
                  Crear cuenta
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
