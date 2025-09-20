import React, { useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {setProducts, setLoading } from '../../store/store'

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
      const mockProducts = [
        { id: 1, name: 'iPhone 14', price: 799, category: 'phones', image: 'https://via.placeholder.com/200', description: 'Новейший iPhone' },
        { id: 2, name: 'Samsung Galaxy S23', price: 699, category: 'phones', image: 'https://via.placeholder.com/200', description: 'Флагман Samsung' },
        { id: 3, name: 'MacBook Pro', price: 1999, category: 'laptops', image: 'https://via.placeholder.com/200', description: 'Мощный ноутбук Apple' },
        { id: 4, name: 'Dell XPS 13', price: 1299, category: 'laptops', image: 'https://via.placeholder.com/200', description: 'Премиум ноутбук Dell' },
        { id: 5, name: 'iPad Air', price: 599, category: 'tablets', image: 'https://via.placeholder.com/200', description: 'Планшет Apple' },
        { id: 6, name: 'Samsung Galaxy Tab', price: 399, category: 'tablets', image: 'https://via.placeholder.com/200', description: 'Планшет Samsung' }
      ]
      dispatch(setProducts(mockProducts))
      dispatch(setLoading(false))
    }, 1000)
  }, [dispatch])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'price') return a.price - b.price
    return 0
  })

  function addProductToCart(product) {
    const action = { type: 'app/addToCart', payload: product }
    dispatch(action)
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
              onClick={ () => addProductToCart(product) }
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