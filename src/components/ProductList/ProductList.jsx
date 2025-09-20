import React, { useState } from 'react'
import ProductCard from '../ProductCard'

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

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

        <ProductCard 
          searchTerm = {searchTerm}
          selectedCategory = {selectedCategory}
          sortBy = {sortBy}
        />

      </div>
    </>
  )
}

export default ProductList