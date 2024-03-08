export const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
};

export const testNote = {
  id: 'testId',
  title: 'testTitle',
  body: 'testBody',
  imageUrls: ['testUrl1', 'testUrl2'],
  date: 0,
};

export const stateWithOneNote = {
  isSaving: false,
  messageSaved: '',
  notes: [testNote],
  active: null,
};

export const stateWithActiveNote = {
  isSaving: false,
  messageSaved: '',
  notes: [testNote],
  active: testNote,
};

export const testMultipleNotes = [
  {
    id: 'testId1',
    title: 'testTitle1',
    body: 'testBody1',
    imageUrls: ['testUrl1', 'testUrl2'],
    date: 0,
  },
  {
    id: 'testId2',
    title: 'testTitle2',
    body: 'testBody2',
    imageUrls: ['testUrl3', 'testUrl4'],
    date: 1,
  },
];

export const stateWithMultipleNotes = {
  isSaving: false,
  messageSaved: '',
  notes: testMultipleNotes,
  active: null,
};

export const stateWithUpdatedNote = {
  isSaving: false,
  messageSaved: `${testNote.title}, actualizada correctamente.`,
  notes: [testNote],
  active: null,
};
