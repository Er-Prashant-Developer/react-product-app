import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../Utils/Context'
import { set } from 'react-hook-form'
import { Link } from 'react-router-dom'

function Navigation() {
  let [product,setProduct]=useContext(ProductContext)

  // categories niaklne kleye ese karenge

  let distinct_categories=product && product.reduce((acc,cv)=>[...acc,cv.category],[])

  distinct_categories=[...new Set(distinct_categories)]
  
  const color=()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
  }

  useEffect((()=>{color()}),[])

  return (
    <div>
      <nav className='p-5 font-semibold w-full h-screen bg-pink-100 items-center flex flex-col'>
        
        <Link className='border px-2 py-1' to='/create'>Add New Product</Link>
<h1 className='mt-2 w-[80%]'>Category Filters</h1>
<div className='flex flex-col gap-2 w-full mt-2'>

  {distinct_categories.map((c,id)=>
    <Link 
      to={`/?category=${c}`} 
      key={id} 
      className='flex h-[50px] items-center w-[80%] bg-white rounded-lg shadow-sm 
                  px-2 py-1 hover:bg-blue-100 transition'
    >
      <span style={{background:color()}} className="rounded-full mr-2 w-[10px] h-[10px] "></span>
      <p className='text-sm font-medium capitalize'>{c}</p>
    </Link>
  )}

</div>

      </nav>
    </div>
  )
}

export default Navigation