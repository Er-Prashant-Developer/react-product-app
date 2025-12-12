import React, { useContext, useMemo } from 'react'
import { ProductContext } from '../Utils/Context'
import { Link } from 'react-router-dom'

function Navigation() {
  const [product] = useContext(ProductContext)

  // Extract distinct categories
  const distinctCategories = useMemo(() => {
    if (!product) return []
    return [...new Set(product.map((p) => p.category))]
  }, [product])

  // Generate consistent color for category badge
  const getCategoryColor = (category) => {
    let hash = 0
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash)
    }
    const r = (hash >> 16) & 255
    const g = (hash >> 8) & 255
    const b = hash & 255
    return `rgba(${r}, ${g}, ${b}, 0.4)`
  }

  return (
    <nav className="bg-pink-100 w-full md:w-64 h-auto md:h-screen p-5 flex flex-col items-center md:items-start gap-4">
      <Link
        to="/create"
        className="border px-3 py-2 rounded-lg bg-white hover:bg-blue-100 transition font-semibold w-full text-center md:text-left"
      >
        Add New Product
      </Link>

      <h2 className="mt-4 text-lg font-semibold w-full text-left">Category Filters</h2>

      <div className="flex flex-col gap-3 w-full mt-2">
        {distinctCategories.map((c, id) => (
          <Link
            to={`/?category=${c}`}
            key={id}
            className="flex items-center px-3 py-2 bg-white rounded-lg shadow-sm hover:bg-blue-100 transition w-full"
          >
            <span
              className="rounded-full mr-2 w-3 h-3"
              style={{ background: getCategoryColor(c) }}
            ></span>
            <p className="text-sm font-medium capitalize">{c}</p>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
