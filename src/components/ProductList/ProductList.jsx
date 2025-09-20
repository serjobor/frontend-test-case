import React, { useState } from 'react'
import ProductCard from '../ProductCard'
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../data/constants'

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES.ALL)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME)
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
          searchTerm = {searchTerm}
          selectedCategory = {selectedCategory}
          sortBy = {sortBy}
        />

      </div>
    </>
  )
}

export default ProductList