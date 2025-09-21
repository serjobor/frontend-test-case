import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.cart.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
      
    },
    
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.cart.find(item => item.id === id)
      
      if (item) {
        item.quantity = quantity
      }
    },
    
    clearCart: (state) => {
      state.cart = []
    }
  }
})

export const selectCart = (state) => state.cart.cart

export const selectCartStats = (state) => {
  const cart = state.cart.cart
  return {
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    cartItemsCount: cart.length,
    totalPrice: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity,  
  clearCart 
} = cartSlice.actions

export default cartSlice.reducer

