import { createTheme } from '@mui/material';
import { purple, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: purple[800],
    },
    error: {
      main: red.A400,
    },
  },
});
