import { Employee } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import { employeesApi } from '../services/employees'
import { RootState } from '../store/store'

interface InitialState {
    employees: Employee[] | null
}

const initialState: InitialState = {
    employees: null
}

export const employeesSlice = createSlice({
    name: 'employeesSlice',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => { 
        builder
            .addMatcher(employeesApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
                state.employees = action.payload
            })
    }
})

export default employeesSlice.reducer

export const selectEmployees = (state: RootState) => state.employeesSlice

