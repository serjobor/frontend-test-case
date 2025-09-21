import React, { useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'

import { MOCK_PRODUCTS } from '../../data/mockData'
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../data/constants'
import { selectProducts, selectLoading, setProducts, setLoading } from '../../store/reducers/ProductsSlice'
import { addToCart } from '../../store/reducers/CartSlice'

const ProductCard = ({
  searchTerm,
  selectedCategory,
  sortBy
}) => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(setLoading(true))

    setTimeout(() => {
      dispatch(setProducts(MOCK_PRODUCTS))
      dispatch(setLoading(false))
    }, 1000)
  }, [dispatch])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === PRODUCT_CATEGORIES.ALL || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (sortBy === SORT_OPTIONS.NAME) return a.name.localeCompare(b.name)
    if (sortBy === SORT_OPTIONS.PRICE) return a.price - b.price
    return 0
  })

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