import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

function Edit() {
  let [product, setproduct] = useContext(ProductContext);
  let [editpro, seteditpro] = useState({
    title:"",
    description:"",
    image:"",
    price:"",
    category:"",
  });

  const handleonchange = (e) => {
    // console.log(e.target.name,e.target.value)
    seteditpro({ ...editpro, [e.target.name]: e.target.value });
    
  };


  const { id } = useParams();
  const navigate = useNavigate();

  const addproductHandler = (e) => {
    e.preventDefault();

    if (
      editpro.title.trim().length < 5 ||
      editpro.image.trim().length < 5 ||
      editpro.category.trim().length < 5 ||
      editpro.price.trim().length < 1 ||
      editpro.description.trim().length < 5
    ) {
      alert("No field must be empty and least contain 4 charter");
      return;
    }

    // let copydata=editpro.filter((p) => p.id == id)
    
    const epi = product.findIndex((p) => p.id == id);

    const copydata = [...product];

    copydata[epi] = {...product[epi],...editpro};
    
    console.log(editpro,copydata);

   

    setproduct(copydata);

    localStorage.setItem("product", JSON.stringify(copydata));
    toast.success("Product Edit Successfully")
    
    navigate("/");
  };

  // console.log(id)

  useEffect(() => {
    seteditpro(product.filter((p) => p.id == id)[0]);
  }, [id]);

  return (
    <form
      onSubmit={addproductHandler}
      className="flex flex-col  items-center border p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Edit Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3"
        onChange={handleonchange}
        name="image"
        value={editpro && editpro.image}
      />

      <input
        type="text"
        placeholder="Title"
        className="text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3"
        onChange={handleonchange}
        name="title"
        value={editpro && editpro.title}
      />
      <div className="w-1/2 flex gap-5">
        <input
          type="text"
          placeholder="category"
          className="text-2xl bg-zinc-300 rounded p-3 w-[50%] mb-3"
          onChange={handleonchange}
          name="category"
          value={editpro && editpro.category}
        />

        <input
          type="number"
          placeholder="price"
          className="text-2xl bg-zinc-300 rounded p-3 w-[50%] mb-3"
          onChange={handleonchange}
          name="price"
          value={editpro && editpro.price}
        />
      </div>
      <textarea
        name="description"
        className="text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3"
        rows="5"
        onChange={handleonchange}
        value={editpro && editpro.description}
        placeholder="description"
      ></textarea>
      <div className="w-1/2">
        <button className="px-2 py-1 bg-blue-300 rounded-md ">
          Edit Product
        </button>
      </div>
    </form>
  );
}

export default Edit;
