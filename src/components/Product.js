import React from 'react';
import styled from 'styled-components';
import ProductBox from './ProductBox';

const Product = ({data}) => {
  return (
    <ProductSection className='main-padd'>
        <h3> Shopping everyday </h3>
        <span></span>
        <ProductsContainer className=''>
            {
              data.map((product)=> (
                product.id < 9 ?
                 (<ProductBox key={product.id} product={product}/>)
                : null
              )
                             
              )
            }
        </ProductsContainer> 
    </ProductSection>
  )
}

const ProductSection = styled.section`
  padding-top: 50px;
  padding-bottom: 50px;

  h3 , span{
    text-align: center;
  }

  h3{
    @media(max-width: 425px){
      font-size: 16px;
    }
  } 
   
  span{
    background-color: black;
    color: black;
    width: 50px;
    height: 5px;
  }
`
const ProductsContainer = styled.div`
  

  display: grid;
  grid-template-columns : repeat(4 , 1fr);
  gap: 20px;
  margin-top: 30px;

  @media(max-width: 1440px){
    grid-template-columns : repeat(3 , 1fr);
  }

  @media(max-width: 768px){
    grid-template-columns : repeat(2 , 1fr);
  }

  @media(max-width: 500px){
    grid-template-columns : repeat(1 , 1fr);
  }
`

export default Product