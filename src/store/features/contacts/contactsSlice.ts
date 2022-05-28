import { createSlice } from '@reduxjs/toolkit';
// types
import User from '../../../types/user';
// other
import data from '../../../utils/users.json';

const initialState: Array<User> = data;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
});

export default contactsSlice.reducer;
