import React, { useState, useEffect, useMemo, useCallback } from 'react'
import ProductCard from '../ProductCard'
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../data/constants'
import { MOCK_PRODUCTS } from '../../data/mockData'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, setProducts, setLoading, selectLoading } from '../../store/reducers/ProductsSlice'

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES.ALL)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME)
  const [showFilters, setShowFilters] = useState(false)

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

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === PRODUCT_CATEGORIES.ALL || product.category === selectedCategory
      return matchesSearch && matchesCategory
    }).sort((a, b) => {
      if (sortBy === SORT_OPTIONS.NAME) return a.name.localeCompare(b.name)
      if (sortBy === SORT_OPTIONS.PRICE) return a.price - b.price
      return 0
    })
  }, [products, searchTerm, selectedCategory, sortBy])

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value)
  })

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value)
  })

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
              showFilters && (
                <>
                  <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value={PRODUCT_CATEGORIES.ALL}>Все категории</option>
                    <option value={PRODUCT_CATEGORIES.PHONES}>Телефоны</option>
                    <option value={PRODUCT_CATEGORIES.LAPTOPS}>Ноутбуки</option>
                    <option value={PRODUCT_CATEGORIES.TABLETS}>Планшеты</option>
                  </select>

                  <select value={sortBy} onChange={handleSortChange}>
                    <option value={SORT_OPTIONS.NAME}>По названию</option>
                    <option value={SORT_OPTIONS.PRICE}>По цене</option>
                  </select>
                </>
              )
            }

            <button onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
            </button>
          </div>
        </div>

        {
          loading
            ?
            <div className="loading">Загрузка товаров...</div>
            :
            <div className="products">
              {filteredProducts.map(productCard => (
                <ProductCard key={productCard.id} productCard={productCard}/>
              ))}
            </div>
        }
      </div>
    </>
  )
}

export default ProductList