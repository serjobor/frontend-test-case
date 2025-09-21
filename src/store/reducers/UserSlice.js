import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
})

export const selectUser = (state) => state.user.user
export const selectLoading = (state) => state.user.loading
export const selectError = (state) => state.user.error

export const { 
    setUser,
    setLoading,
    setError, 
} = userSlice.actions

export default userSlice.reducer