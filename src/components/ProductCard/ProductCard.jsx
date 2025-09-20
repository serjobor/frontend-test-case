import React, { useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {setProducts, setLoading, addToCart } from '../../store/store'
import { MOCK_PRODUCTS } from '../../data/mockData'
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../data/constants'

const ProductCard = ({
  searchTerm,
  selectedCategory,
  sortBy
}) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.app.products)
  const loading = useSelector((state) => state.app.loading)

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

  function handleaddProductToCart(product) {
    // dispatch({ type: 'app/addToCart', payload: product })
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
              onClick={ () => handleaddProductToCart(product) }
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