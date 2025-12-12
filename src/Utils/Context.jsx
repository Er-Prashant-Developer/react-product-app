import { set } from 'react-hook-form'
import axios from './Axios'
import React, { createContext, useEffect, useState } from 'react'

export const ProductContext=createContext()
function Context(props) {

  let [product,setProduct]=useState(JSON.parse(localStorage.getItem("product"))||null)

//   const getProducts=async()=>{
//     try {
//       const {data}=await axios.get("/products")
//      setProduct(data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// // console.log(product)
//   useEffect((()=>{getProducts()}),[])

  return (
    <div><ProductContext.Provider value={[product,setProduct]}>
    {props.children}</ProductContext.Provider>
    </div>
  
  )
}

export default Context