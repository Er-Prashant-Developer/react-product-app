import React, { useContext, useState } from 'react'
import { ProductContext } from '../Utils/Context'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Create() {
  const navigate = useNavigate()
  const [product, setProduct] = useContext(ProductContext)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const addProductHandler = (e) => {
    e.preventDefault()

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("No field must be empty and must contain at least 4 characters")
      return
    }

    const newProduct = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description
    }

    setProduct([...product, newProduct])
    localStorage.setItem("product", JSON.stringify([...product, newProduct]))
    toast.success("Product Added Successfully")
    navigate("/")
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={addProductHandler} 
        className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6 md:p-10 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center">Add New Product</h1>

        <input
          type="url"
          placeholder="Image link"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Category"
            className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Description"
          rows="5"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add New Product
        </button>
      </form>
    </div>
  )
}

export default Create
