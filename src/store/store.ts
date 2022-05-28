import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

// reducers
import contactsReducer from './features/contacts/contactsSlice';
import billReducer from './features/bill/billSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    bill: billReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
