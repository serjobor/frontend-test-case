import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    loading: false,
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
})

export const selectProducts = (state) => state.products.products
export const selectLoading = (state) => state.products.loading
export const selectError = (state) => state.products.error

export const {
    setProducts,
    setLoading,
    setError
} = productsSlice.actions

export default productsSlice.reducer

