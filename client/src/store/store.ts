import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import employeesSlice from '../features/employeesSlice'
import { api } from '../services/api'
import { authListenerMiddleware } from '../middleware/auth'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        authSlice,
        employeesSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware).prepend(authListenerMiddleware.middleware)
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;