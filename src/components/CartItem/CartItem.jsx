import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../store/reducers/CartSlice'

const CartItem = ({
  cartItem
}) => {
  const dispatch = useDispatch()

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id)
      return
    }
    dispatch(updateQuantity({ id, quantity }))
  }

  return (
    <>
      <div className="cart-item">
        <img src={cartItem.image} alt={cartItem.name} />
        <div className="item-details">
          <h4>{cartItem.name}</h4>
          <p>${cartItem.price}</p>
          <div className="quantity-controls">
            <button onClick={() => handleUpdateQuantity(cartItem.id, cartItem.quantity - 1)}>
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button onClick={() => handleUpdateQuantity(cartItem.id, cartItem.quantity + 1)}>
              +
            </button>
          </div>
        </div>
        <button
          className="remove-btn"
          onClick={() => handleRemoveItem(cartItem.id)}
        >
          Удалить
        </button>
      </div>
    </>
  )
}

export default CartItem