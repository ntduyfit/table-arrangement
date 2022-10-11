import { configureStore } from '@reduxjs/toolkit';

import TableReducer from '../features/tableArrangement/reducer';

const store = configureStore({ reducer: { tables: TableReducer } });

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
