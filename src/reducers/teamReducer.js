import { createSlice } from '@reduxjs/toolkit'

const teamSlice = createSlice({
    name: 'team',
    initialState: [],
    reducers: {
        setTeam(state, action) {
            if(!action.payload) return []
            return action.payload.map(m => ({
                ...m,
                positions: m.positions.map(p => {
                    const position = {...p, start: new Date(p.start)}
                    if(position.end) position.end = new Date(position.end)
                    return position
                }),
                board: m.board.map(p => {
                    const position = {...p, start: new Date(p.start)}
                    if(position.end) position.end = new Date(position.end)
                    return position
                })
            }))
        },
        appendTeam(state, action) {
            const payload = {...action.payload,
                positions: action.payload.positions.map(p => ({...p, start: new Date(p.start), end: p.end && new Date(p.end)})),
                board: action.payload.board.map(p => ({...p, start: new Date(p.start), end: p.end && new Date(p.end)}))
            }
            return [...state, payload]
        }
    },
})

export const { setTeam, appendTeam } = teamSlice.actions
export default teamSlice.reducer