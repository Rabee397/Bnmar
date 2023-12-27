import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link , useNavigate} from 'react-router-dom';
import ProductCart from '../components/ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../redux/bnmarSlice';
import { ToastContainer, toast } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const Cart = () => {
  const productData = useSelector((state)=> state.bnmar.productData);
  const userInfo = useSelector((state) => state.bnmar.userInfo);
  const [payNow , setPayNow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [totalAmount , setTotalAmount] = useState('');
  useEffect(()=>{
    let total = 0;
    productData.map((item)=>{
      total += item.price * item.quantity;
      return total;
    })
    setTotalAmount(total.toFixed(2));
  },[productData])
  
  const hundleCheckout = ()=>{
    if(userInfo){
      setPayNow(true);
    }else{
      toast.error("please sign in first!!");
      setTimeout(()=>{
        navigate("/login");
      },2500);
      
    }
  }

  const payment = async(token)=>{
    await axios.post("http://localhost:8000/pay",{
      amount : totalAmount * 100,
      token : token
    })
  }
  return (
    <CartSection className=''>
       <div className='img-container'>
        <img src='https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compares' alt='' />
       </div>
       {productData.length < 1 ? (<p className='no-product'> There is no item on Cart </p>)
        :(
          <Container className='flex-full main-padd'>
            <ProductSide>
              <ProductCart />
              <button className='reset-btn' onClick={()=> dispatch(resetCart()) & toast.error('Your cart is empty')}> Reset Cart </button>
              <div>
                <Link to='/'> Go shopping </Link>
              </div>
            </ProductSide>
            <CartCheckoutSide>
                <h3> Cart Total </h3>
                <div className='subtotal'>
                    <span> Subtotal </span>
                    <span> $ {totalAmount} </span>
                    <hr/>
                    <div className='total flex-full'>
                        <span> Total </span>
                        <span>  $ {totalAmount} </span>
                    </div>
                    <button className='checkout-btn' onClick={hundleCheckout}> proceed to checkout </button>
                    {
                      payNow && (
                        <>
                          <StripeCheckout
                            stripeKey='pk_test_51O6oAbCg34YXRRUCk29g7EsSHab2Y93JmzpXxNU7Ms7EK83imIYHHg0VrxIYMcuBpRrQrwTAdQNQzgB5fuTi1Zuc00gAYdE7FV'
                            name='Bnmar Shopping'
                            amount={totalAmount * 100}
                            label='pay to bnmar'
                            description={`Your payment amount is $${totalAmount}`}
                            token={payment}
                            email={userInfo.email}
                          />  
                        </>
                      )
                    }
                </div>
            </CartCheckoutSide>
          </Container>
        )
       }
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
    </CartSection>
  )
}

const CartSection = styled.section`
  margin: 50px 0 150px 0;

  .img-container{
    height: 60vh;
    padding: 0;
    margin-bottom: 70px;

    img{
      width: 100%;
      height: 100%;
      display: block;
      padding: 0;
    }
  }

  .no-product{
    text-align: center;
    padding-top: 120px;
  }
`
const Container = styled.div`
  &.flex-full{
    align-items: flex-start;

    @media(max-width: 900px){
      flex-direction: column;
    }
  }

  @media(max-width: 425px){
    padding: 0px 0.5rem;
  }
`
const ProductSide = styled.div`
  width: 70%;
  
  @media(max-width: 900px){
    width: 100%;
  }
  
  
  .reset-btn{
    background-color: red;
    color: white;
    padding: 10px 15px;
    margin: 15px 0;

    @media(max-width: 375px){
      padding: 5px 10px;
      font-size: 0.7rem;
    }
  }
`
const CartCheckoutSide = styled.div`
  background-color: rgb( 240 , 240 , 244);
  padding: 15px;
  width: 20%;
  
  @media(max-width: 900px){
    width: 40%;
    margin-top: 20px;
  }
  @media(max-width: 375px){
    width: 75%;
    font-size: 0.8rem;
  }

  .subtotal , .total{
    margin: 10px 0;
  }
  .checkout-btn{
    background-color: black;
    color: white;
    width: 100%;
    padding: 10px 0;
    margin-top: 10px;
  }
`

export default Cart;