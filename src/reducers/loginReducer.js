import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return null    
        }
    },
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer