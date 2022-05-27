import { createSlice } from '@reduxjs/toolkit';
// types
import Person from '../../../types/person';
// other
import data from '../../../utils/users.json';

const initialState: Array<Person> = data;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
});

export default contactsSlice.reducer;
