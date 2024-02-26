import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMemo } from 'react';

export const SideBarItem = ({ id, title, body, date }) => {
  const newTitle = useMemo(() => {
    return id.length > 10 ? id.slice(0, 10) + '...' : id;
  });

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={date} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
