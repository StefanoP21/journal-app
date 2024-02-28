import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSaveNote } from '../../store/journal';

export const NoteView = () => {
  const dispatch = useDispatch();

  const { active: activeNote } = useSelector((state) => state.journal);

  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  const dateToString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateToString}
        </Typography>
      </Grid>

      <Grid item>
        <Button onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          fullWidth
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          placeholder="¿Qué pasó hoy?"
          label="Descripción"
          fullWidth
          multiline
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
