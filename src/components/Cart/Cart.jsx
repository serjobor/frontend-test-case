import React, { useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import CartItem from '../CartItem'

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.app.cart)
  const cartCount = useSelector((state) => state.app.cartCount)
  const totalPrice = useSelector((state) => state.app.totalPrice)

  const [isOpen, setIsOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

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
                <CartItem/>
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