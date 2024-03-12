import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from '../../../src/store/journal/journalSlice';
import {
  startDeletingNote,
  startLoadingNotes,
  startNewNote,
  startSaveNote,
} from '../../../src/store/journal/thunks';
import { FirebaseDB } from '../../../src/firebase/config';
import { loadNotes } from '../../../src/helpers';
import { stateWithActiveNote } from '../../fixtures/journalFixtures';

describe('Pruebas en Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('startNewNote debe de crear una nueva nota en blanco', async () => {
    const uid = 'TESTING-UID';
    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        title: '',
        body: '',
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        title: '',
        body: '',
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: [],
      })
    );

    // Borrar de firestore
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];

    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  }, 10000);

  test('startLoadingNotes debe agregar todas las notas', async () => {
    const uid = 'TESTING-UID';
    getState.mockReturnValue({ auth: { uid } });

    const notes = await loadNotes(uid);

    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setNotes(notes));
  }, 10000);

  test('startSaveNote debe de actualizar las notas', async () => {
    const uid = 'TESTING-UID';
    getState.mockReturnValue({
      auth: { uid },
      journal: { active: stateWithActiveNote },
    });

    await startSaveNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(updateNote(stateWithActiveNote));
  }, 10000);

  test('startDeletingNote debe eliminar una nota', async () => {
    const uid = 'TESTING-UID';
    getState.mockReturnValue({
      auth: { uid },
      journal: { active: stateWithActiveNote },
    });

    await startDeletingNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(
      deleteNoteById(stateWithActiveNote.id)
    );
  }, 10000);
});
