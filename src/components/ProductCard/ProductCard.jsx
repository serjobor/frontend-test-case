import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoading } from '../../store/reducers/ProductsSlice'
import { addToCart } from '../../store/reducers/CartSlice'

const ProductCard = ({
  filteredProducts
}) => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  function handleAddProductToCart(product) {
    dispatch(addToCart(product))
  }

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>
  }
  return (
    <>
      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price}</div>
            <button
              onClick={ () => handleAddProductToCart(product) }
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductCard