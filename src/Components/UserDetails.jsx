import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Utils/Context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function UserDetails() {
const navigate=useNavigate()
  const [product,setproduct] = useContext(ProductContext)

  const [pro,setpro]=useState(null)

  const { id } = useParams()   // id string hai
  

  // const item = product.find(p => p.id == id)   // == because id string hai
  
  useEffect(() => {
    if (!product) return;  // <- VERY IMPORTANT FIX

    const obj = product.filter(p => p.id == id)[0];
    setpro(obj);

  }, [product]);
  

  const deletehandler=(id)=>{
const filterdeleteproducts=product.filter(p=>p.id!=id)
setproduct(filterdeleteproducts)
localStorage.setItem("product",JSON.stringify(filterdeleteproducts))
toast.success("Product Deleted Successfully")
navigate("/")
  }

  return pro?(
    <div className='flex p-10 justify-center items-center w-full h-screen'>

      <div className='shadow-2xl w-[40%] p-5 h-[70%] mt-10 mr-10 '>
        <img className='w-full h-full object-contain' src={`${pro.image}`} alt="" />
      </div>

      <div className='details w-[35%]'>
        <h1 className='text-xl font-semibold'>{`${pro.title}`}</h1>
        <h2 className='text-xl font-semibold'>Price Rs - {`${pro.price}`}</h2>
        <h3 className='text-xl font-semibold'>Category - {`${pro.category}`}</h3>
        <p>Description: {`${pro.description}`}</p>
      
      <Link to={`/edit/${pro.id}`} className='mt-5 px-2 py-1 rounded-md bg-blue-400'>Edit</Link>
      <button onClick={()=>deletehandler(pro.id)} className='px-2 py-1 rounded-md bg-red-400 ml-5'>Delete</button>
      
      </div>
    </div>
  ):"Loading"
}

export default UserDetails
