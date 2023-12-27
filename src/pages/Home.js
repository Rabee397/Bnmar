import React, { useEffect, useState } from 'react'
import Banar from '../components/Banar'
import Product from '../components/Product'
import axios from 'axios';

const Home = () => {
  
  const [productData , setProductData] = useState([]);
  useEffect(()=>{
    axios.get("https://fakestoreapi.com/products")
    .then((res)=> setProductData(res.data));
  },[])
  
  return (
    <div>
        <Banar />
        <Product data={productData}/>
    </div>
  )
}

export default Home