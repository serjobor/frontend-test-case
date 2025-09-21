import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/UserSlice'
import productsReducer from './reducers/ProductsSlice'
import cartReducer from './reducers/CartSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
  }
})

export default store