import React, { useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.app.cart)
  const cartCount = useSelector((state) => state.app.cartCount)
  const totalPrice = useSelector((state) => state.app.totalPrice)

  const [isOpen, setIsOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

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

  const handleCheckout = () => {
    setShowCheckout(true)
    setTimeout(() => {
      alert('Заказ оформлен!')
      dispatch({ type: 'app/clearCart' })
      setShowCheckout(false)
      setIsOpen(false)
    }, 1000)
  }

  return (
    <>
      <div className="cart">
        <button
          className="cart-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          Корзина ({cartCount})
        </button>

        {isOpen && (
          <div className="cart-dropdown">
            <div className="cart-header">
              <h3>Корзина</h3>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <p>Корзина пуста</p>
              ) : (
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
              )}
            </div>

            <div className="cart-footer">
              <div className="total">Итого: ${totalPrice}</div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cart.length === 0 || showCheckout}
              >
                {showCheckout ? 'Оформляем...' : 'Оформить заказ'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart