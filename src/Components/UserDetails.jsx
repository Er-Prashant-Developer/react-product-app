import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Utils/Context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function UserDetails() {
  const navigate = useNavigate()
  const [product, setProduct] = useContext(ProductContext)
  const [pro, setPro] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    if (!product) return
    const item = product.find((p) => p.id == id)
    setPro(item)
  }, [product, id])

  const deleteHandler = (id) => {
    const filteredProducts = product.filter((p) => p.id != id)
    setProduct(filteredProducts)
    localStorage.setItem("product", JSON.stringify(filteredProducts))
    toast.success("Product Deleted")
    navigate("/")
  }

  if (!pro) return <div className="flex justify-center items-center min-h-screen">Loading...</div>

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center p-5 md:p-10 min-h-screen gap-6 bg-gray-100">
      {/* Product Image */}
      <div className="shadow-2xl bg-white rounded-lg w-full md:w-2/5 h-64 md:h-[70%] flex justify-center items-center p-4">
        <img className="w-full h-full object-contain" src={pro.image} alt={pro.title} />
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-lg w-full md:w-2/5 p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{pro.title}</h1>
        <h2 className="text-xl font-medium">Price: Rs {pro.price}</h2>
        <h3 className="text-lg font-medium capitalize">Category: {pro.category}</h3>
        <p className="text-gray-700">{pro.description}</p>

        <div className="flex gap-4 mt-4">
          <Link
            to={`/edit/${pro.id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteHandler(pro.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
