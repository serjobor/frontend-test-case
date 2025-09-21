import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/reducers/CartSlice'

const ProductCard = memo(({
  productCard
}) => {
  const dispatch = useDispatch()

  function handleAddProductToCart(productCard) {
    dispatch(addToCart(productCard))
  }

  return (
    <>
      <div className="product-card">
        <img src={productCard.image} alt={productCard.name} />
        <h3>{productCard.name}</h3>
        <p>{productCard.description}</p>
        <div className="price">${productCard.price}</div>
        <button
          onClick={() => handleAddProductToCart(productCard)}
        >
          Добавить в корзину
        </button>
      </div>
    </>
  )
})

export default ProductCard