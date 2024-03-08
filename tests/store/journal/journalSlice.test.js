import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from '../../../src/store/journal/journalSlice';
import {
  initialState,
  stateWithActiveNote,
  stateWithMultipleNotes,
  stateWithOneNote,
  stateWithUpdatedNote,
  testMultipleNotes,
  testNote,
} from '../../fixtures/journalFixtures';

describe('Pruebas en journalSlice', () => {
  test('debe de regresar el estado inicial y llamarse "journal"', () => {
    expect(journalSlice.name).toBe('journal');

    const state = journalSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('debe de cambiar el estado de isSaving', () => {
    const state = journalSlice.reducer(initialState, savingNewNote());

    expect(state.isSaving).toBe(true);
  });

  test('debe de agregar una nota vacía', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(testNote));

    expect(state).toEqual(stateWithOneNote);
  });

  test('debe de actualizar la nota activa', () => {
    const state = journalSlice.reducer(
      stateWithOneNote,
      setActiveNote(testNote)
    );

    expect(state).toEqual(stateWithActiveNote);
  });

  test('debe de agregar las notas', () => {
    const state = journalSlice.reducer(
      initialState,
      setNotes(testMultipleNotes)
    );

    expect(state).toEqual(stateWithMultipleNotes);
  });

  test('debe de actualizar el estado', () => {
    const state = journalSlice.reducer(initialState, setSaving());

    expect(state.isSaving).toBe(true);
  });

  test('debe de actualizar la nota', () => {
    const state = journalSlice.reducer(stateWithOneNote, updateNote(testNote));

    expect(state).toEqual(stateWithUpdatedNote);
  });

  test('debe de actualizar las imagenes de la nota activa', () => {
    const imageUrls = ['testUrl3', 'testUrl4'];

    const state = journalSlice.reducer(
      stateWithActiveNote,
      setImagesToActiveNote(imageUrls)
    );

    expect(state.active.imageUrls).toEqual([
      'testUrl1',
      'testUrl2',
      'testUrl3',
      'testUrl4',
    ]);
  });

  test('debe de regresar al estado inicial al salir', () => {
    const state = journalSlice.reducer(stateWithActiveNote, clearNotesLogout());

    expect(state).toEqual(initialState);
  });

  test('debe eliminar una nota por id', () => {
    const state = journalSlice.reducer(
      stateWithActiveNote,
      deleteNoteById(testNote.id)
    );

    expect(state).toEqual(initialState);
  });
});
