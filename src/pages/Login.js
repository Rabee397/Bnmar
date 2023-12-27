import React from 'react';
import {FaGoogle, FaGithub} from 'react-icons/fa';
import styled from 'styled-components';
import {signInWithPopup , signOut} from 'firebase/auth';
import { auth, provider } from '../firebase';
import {toast , ToastContainer} from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../redux/bnmarSlice';
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hundleGoogleLogin = (e)=>{
    e.preventDefault();
    signInWithPopup(auth , provider)
    .then((result)=>{
      const user = result.user;
      console.log(user)
      dispatch(addUser({
        id : user.uid,
        name : user.displayName,
        email : user.email,
        image : user.photoURL,
      
      }));
      setTimeout(()=>{
        navigate("/");
      },1500)
    }).catch((error)=>{
      console.log(error);
    })
  }

  const hundleSignOut = ()=>{
    signOut(auth)
    .then(()=>{
      toast.success("Log out successfully");
      dispatch(removeUser());
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <LoginSection>
        <Container>
            <LoginBox>
                <button className='google-btn' onClick={hundleGoogleLogin}>
                    <FaGoogle />
                    <span> Sign in with Google </span>
                </button>
                <button className='sign-out' onClick={hundleSignOut}> Sign Out </button>
            </LoginBox>
            <LoginBox>
                <button className='github-btn'>
                    <FaGithub />
                    <span> Sign in with Github </span>
                </button>
            </LoginBox>
        </Container>
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
    </LoginSection>
  )
}

const LoginSection = styled.section`
  margin: 252px 0 171px 0;
  display : flex;
  justify-content: center;
`
const Container = styled.div`
  
`
const LoginBox = styled.div`
  button{
    display: flex;
    gap: 10px;
    align-items: center;
    padding : 10px 20px;
    width: 200px;
    background-color: white;
  }

  .github-btn{
    margin-top: 30px;
  }
`

export default Login;