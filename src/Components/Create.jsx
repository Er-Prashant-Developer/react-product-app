import React, { useContext, useState } from 'react'
import { ProductContext } from '../Utils/Context'
import {nanoid} from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Create() {

  const navigate=useNavigate()

  let [product,setproduct]=useContext(ProductContext)

  const [title,settitle]=useState("")
  const [image,setimage]=useState("")
  const [category,setcategory]=useState("")
  const [price,setprice]=useState("")
  const [description,setdescription]=useState("")
  
  const addproductHandler=(e)=>{
    e.preventDefault()

    if(
      title.trim().length<5 || 
      image.trim().length<5 ||
      category.trim().length<5 ||
      price.trim().length<1 ||
      description.trim().length<5){
alert("No field must be empty and least contain 4 charter")
return
    }

// if (
//   title.trim().length < 5 ||
//   image.trim().length < 5 ||
//   category.trim().length < 5 ||
//   price.trim().length < 1 ||
//   description.trim().length < 5
// ) {
//   alert("No field must be empty and must contain at least 4 characters");
//   return;
// }


    const products={
      id:nanoid(),
      title,
      image,
      category,
      price,
      description
    }
    setproduct([...product , products])
    localStorage.setItem(
      "product",
      JSON.stringify([...product,products])
    )
    toast.success("Product Added Successfully")
    navigate("/")
    
  }
  
  return (
    <form onSubmit={addproductHandler} className='flex flex-col  items-center border p-[5%] w-screen h-screen'>
      <h1 className='mb-5 w-1/2 text-3xl'>Add New Product</h1>
<input
  type="url" 
  placeholder='image link'
  className='text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3'
  onChange={(e)=>setimage(e.target.value)}
  value={image} 
   />

<input
  type="text" 
  placeholder='Title'
  className='text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3'
  onChange={(e)=>settitle(e.target.value)}
  value={title} 
   />
<div className='w-1/2 flex gap-5'>
  <input
  type="text" 
  placeholder='category'
  className='text-2xl bg-zinc-300 rounded p-3 w-[50%] mb-3'
  onChange={(e)=>setcategory(e.target.value)}
  value={category} 
   />

<input
  type="number" 
  placeholder='price'
  className='text-2xl bg-zinc-300 rounded p-3 w-[50%] mb-3'
  onChange={(e)=>setprice(e.target.value)}
  value={price} 
   />
</div>
<textarea  className='text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3' rows='5'  onChange={(e)=>setdescription(e.target.value)}
  value={description} placeholder='description'></textarea>
  <div className='w-1/2'>
  <button className='px-2 py-1 bg-blue-300 rounded-md '>Add New Product</button></div>
</form>
  )
}

export default Create