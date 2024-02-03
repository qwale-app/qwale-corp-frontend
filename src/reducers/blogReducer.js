import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blog',
    initialState: {owned: [], all: []},
    reducers: {
        setOwned(state, action) {
            return {...state, owned: action.payload}
        },
        setPage(state, action) {
            return {...state, all: action.payload}
        }
    },
})

export const { setOwned, setPage } = blogSlice.actions
export default blogSlice.reducer