import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard'
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../data/constants'
import { MOCK_PRODUCTS } from '../../data/mockData'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, setProducts, setLoading } from '../../store/reducers/ProductsSlice'

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES.ALL)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME)
  const [showFilters, setShowFilters] = useState(false)

  const dispatch = useDispatch()
  const products = useSelector(selectProducts)

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
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
            {
              showFilters ? 
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value={PRODUCT_CATEGORIES.ALL}>Все категории</option>
                <option value={PRODUCT_CATEGORIES.PHONES}>Телефоны</option>
                <option value={PRODUCT_CATEGORIES.LAPTOPS}>Ноутбуки</option>
                <option value={PRODUCT_CATEGORIES.TABLETS}>Планшеты</option>
              </select>
              :
              <></>
            }

            {
              showFilters ? 
              <select value={sortBy} onChange={handleSortChange}>
                <option value={SORT_OPTIONS.NAME}>По названию</option>
                <option value={SORT_OPTIONS.PRICE}>По цене</option>
              </select>
              :
              <></>
            }

            <button onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
            </button>
          </div>
        </div>

        <ProductCard
          filteredProducts = {filteredProducts}
        />

      </div>
    </>
  )
}

export default ProductList