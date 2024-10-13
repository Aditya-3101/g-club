import {configureStore} from '@reduxjs/toolkit';
import {dataSlice} from './dataSlice.ts'

export const store = configureStore({
    reducer:dataSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;