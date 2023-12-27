import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {FaShoppingCart , FaBars , FaTimes} from 'react-icons/fa';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const Header = ()=>{
    const [mob , isMob] = useState(false);
    const productData = useSelector((state) => state.bnmar.productData);
    const userInfo = useSelector((state) => state.bnmar.userInfo);
    return(
        <TopHeader className='main-padd flex-full'>
                <Link to='/' style={{"display" : "block"}}> 
                  <h2 className='brand'> BNMAR </h2>
                </Link>
                <nav className={mob ? "nav-mob flex-full" : "nav flex-full"}>
                  
                  <Link to='/'> Home </Link>
                  <Link to=''> Pages </Link>
                  <Link to=''> Shop </Link>
                  <Link to=''> Element </Link>
                  <Link to=''> Blog </Link>
                </nav>
                <div className='cart'>
                  <Link to='/cart'>
                    <FaShoppingCart style={{"width" : "30px" , "height" : "30px"}}/>
                    <span> {productData.length} </span>
                  </Link>
                </div>
                {
                  userInfo ? (
                    <>
                      <p className='user-name'> {userInfo.name} </p>
                      <img src={userInfo.image} alt='user' className='user-img'/>
                      <Link to='/login' className='log-out'> Logout </Link>
                    </>
                    
                  ):(
                    <Link to='/login'> Login </Link>
                  )
                }
                <MobMode onClick={()=> isMob(!mob)}>
                  { mob ? <FaTimes className='fa-bars'/> : <FaBars /> }
                </MobMode>  
            
        </TopHeader>
    )
}

const TopHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: white;
  z-index: 10;
  padding-top: 7px;
  padding-bottom: 7px;
  
  .nav{
    gap: 10px;
    width: 40%;

    @media(max-width:768px){
       display: none;
    }
    
  }

  .nav-mob{
      
    @media(max-width: 768px){
      position: fixed;
      top: 50px;
      right: 2rem;
      width: 200px;
      flex-direction: column;
      gap: 15px;
      background-color: rgb(0 , 80 , 80);
      color: white;
      z-index: 100;
      padding: 15px 0;
    }
    @media(max-width: 260px){
      right: 0;
      width: 100%;
    }
   }
  

  

  a:hover{
    color: orange;
    text-decoration: underline;
  }

  .cart{
    position: relative;
    span{
        position: absolute;
        top: 3.7px;
        left: 45%;
        color: white;
    }
  }

  .user-img{
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  
  @media(max-width: 470px){
    &{
      padding-left : 0.5rem;
      padding-right : 0.5rem; 
    }
    .brand{
      font-size: 16px;
    }
    .user-name , .log-out{
      font-size: 0.6rem;
    }
    .user-img{
      width: 13px;
      height: 13px;
    }
  }

  @media(max-width: 320px){
    .user-name , .log-out{
      font-size: 0.5rem;
    }
    .user-img{
      display: none;
    }
  }
  
`

const MobMode = styled.div`
  display: none;

  @media(max-width: 768px){
    display: flex;
  }
`
export default Header;