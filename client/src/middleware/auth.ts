import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from '../services/auth'

export const authListenerMiddleware = createListenerMiddleware();   

authListenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async(action, listenerApi) => {
        listenerApi.cancelActiveListeners()

        if (action.payload.token) {
            localStorage.setItem('token', action.payload.token)
        }
    }
})