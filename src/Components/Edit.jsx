import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
  const [product, setProduct] = useContext(ProductContext);
  const [editPro, setEditPro] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currentProduct = product.find((p) => p.id === id);
    if (currentProduct) setEditPro(currentProduct);
  }, [id, product]);

  const handleOnChange = (e) => {
    setEditPro({ ...editPro, [e.target.name]: e.target.value });
  };

  const editProductHandler = (e) => {
    e.preventDefault();

    if (
      editPro.title.trim().length < 5 ||
      editPro.image.trim().length < 5 ||
      editPro.category.trim().length < 5 ||
      editPro.price.trim().length < 1 ||
      editPro.description.trim().length < 5
    ) {
      alert("No field must be empty and must contain at least 4 characters");
      return;
    }

    const index = product.findIndex((p) => p.id === id);
    const updatedProducts = [...product];
    updatedProducts[index] = { ...updatedProducts[index], ...editPro };

    setProduct(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    toast.success("Product Edited Successfully");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={editProductHandler}
        className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6 md:p-10 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center">Edit Product</h1>

        <input
          type="url"
          placeholder="Image link"
          name="image"
          value={editPro?.image || ""}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={editPro?.title || ""}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={editPro?.category || ""}
            onChange={handleOnChange}
            className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={editPro?.price || ""}
            onChange={handleOnChange}
            className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={editPro?.description || ""}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Edit Product
        </button>
      </form>
    </div>
  );
}

export default Edit;
