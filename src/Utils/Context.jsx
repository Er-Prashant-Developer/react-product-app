import React, { createContext, useEffect, useState } from 'react'
import axios from './Axios'

export const ProductContext = createContext()

function Context({ children }) {
  const [product, setProduct] = useState(
    JSON.parse(localStorage.getItem("product")) || []
  )

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/products")
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }

    getProducts()
  }, [])

  return (
    <ProductContext.Provider value={[product, setProduct]}>
      {children}
    </ProductContext.Provider>
  )
}

export default Context
