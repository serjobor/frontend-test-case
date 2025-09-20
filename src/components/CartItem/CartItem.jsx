import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function CartItem() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.app.cart)

  const handleRemoveItem = (id) => {
    dispatch({ type: 'app/removeFromCart', payload: id })
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id)
      return
    }
    dispatch({ type: 'app/updateQuantity', payload: { id, quantity } })
  }

  return (
    <>
      {
        cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Удалить
            </button>
          </div>
        ))
      }
    </>
  )
}

export default CartItem