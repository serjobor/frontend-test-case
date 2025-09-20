import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {setProducts, setLoading } from '../../store/store'

function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.app.products)
  const loading = useSelector((state) => state.app.loading)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>
  }

  return (
    <>
      <div className="product-list">
        <div className="filters">
          <div className="search">
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="filter-controls">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="all">Все категории</option>
              <option value="phones">Телефоны</option>
              <option value="laptops">Ноутбуки</option>
              <option value="tablets">Планшеты</option>
            </select>

            <select value={sortBy} onChange={handleSortChange}>
              <option value="name">По названию</option>
              <option value="price">По цене</option>
            </select>

            <button onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
            </button>
          </div>
        </div>

        <div className="products">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price">${product.price}</div>
              <button
                onClick={() => {
                  const action = { type: 'app/addToCart', payload: product }
                  dispatch(action)
                }}
              >
                Добавить в корзину
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductList