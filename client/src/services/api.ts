import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'

const BASE_URL = 'http://localhost:8000/api'

const baseQuary = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders (headers, {getState})  {
        const token = (getState() as RootState).authSlice.user?.token || localStorage.getItem('token')

        if (token && token !== null) {
            headers.set('Authorization', `Bearer ${token}`)
        }
    }
})

const baseQuaryWithRetry = retry(baseQuary, { maxRetries: 1 })

export const api = createApi({
    reducerPath: 'clientApi',
    baseQuery: baseQuaryWithRetry, 
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
})

