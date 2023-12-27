import React from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/bnmarSlice';
import { ToastContainer, toast } from 'react-toastify';

const ProductBox = ({product}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _id = product.title;
  const idString = (_id)=>{
    return String(_id).toLowerCase().split(" ").join("");
  }
  const idRoot = idString(_id);
  
  const hundleProduct = ()=>{
    navigate(`/ProductDetailes/${idRoot}` ,
    {
      state : {
        item : product,
      }
    })
}
  return (
    <ProductBoxContainer>
      <div className='img-container' onClick={hundleProduct}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className='product-info flex-full'>
        <p> {product.title} </p>
        <p className='price'> {product.price} </p>
      </div>
      <p className='cate'> {product.category} </p>
      <button className='add-to-cart' onClick={()=> dispatch(addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      })) & toast.success(`${product.title} is added`)}> Add to cart </button>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ProductBoxContainer>
  )
}

const ProductBoxContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  position: relative;

  .img-container{
    width: 250px;
    height: 150px;
    margin: auto;
    padding-bottom: 10px;

    @media(max-width: 920px){
      width: 200px;
    }

    @media(max-width: 768px){
      width: 120px;
      height: 120px;
    }

    img{
      display: block;
      max-width: 100%;
      height: 100%;
      margin: auto;
    }
  }

  .product-info{
   padding-bottom: 15px;
   
   @media(max-width: 320px){
    font-size: 0.8rem;
   }

   &.flex-full{
    @media(max-width: 260px){
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
   }
   p:first-child{
    max-width: 80%;
   }
   
  }

  .cate{
    padding: 0px 0 13px 0;
    margin-bottom: 18px;

    @media(max-width: 260px){
      text-align: center;
    }
  }

  .add-to-cart{
    text-align: center;
    padding: 5px 10px;
    border-radius: 10px;
    color: white;
    background-color: black;
    position: absolute;
    bottom : 5px;
    left: 50%;
    transform: translatex(-50%);

    @media(max-width: 250px){
      padding: 3px 6px;
      border-radius: 6px;
      font-size: 0.7rem;
    }
  }
`
export default ProductBox