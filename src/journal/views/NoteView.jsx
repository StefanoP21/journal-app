import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal';
import Swal from 'sweetalert2';

export const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active: activeNote,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  const dateToString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        title: '¡Actualizado!',
        text: messageSaved,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  const onFileInputChange = ({ target }) => {
    const { files } = target;

    if (files === 0) return;

    dispatch(startUploadingFiles(files));
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
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />

        <Button
          color="warning"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
          sx={{ padding: 1 }}
        >
          <UploadFileOutlined sx={{ fontSize: 25, mr: 1 }} />
          Subir imágenes
        </Button>

        <Button
          onClick={onSaveNote}
          disabled={isSaving}
          color="success"
          sx={{ padding: 1 }}
        >
          <SaveOutlined sx={{ fontSize: 25, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', my: 1 }}
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
          sx={{ border: 'none', my: 1 }}
          fullWidth
          multiline
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button
          onClick={onDeleteNote}
          disabled={isSaving}
          color="error"
          sx={{ padding: 1 }}
        >
          <DeleteOutline sx={{ fontSize: 25, mr: 1 }} />
          Eliminar
        </Button>
      </Grid>

      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
