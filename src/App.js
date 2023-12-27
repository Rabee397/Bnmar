import React from 'react' ;
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import "./App.css" ;
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
 
function App() {
    
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
          <Route path='/ProductDetailes/:id' element={
            <>
              <Header />
              <ProductDetails />
              <Footer />
            </>
            }
          />
          <Route path='/cart' element={
            <>
              <Header />
              <Cart />
              <Footer />
            </>
           }
          />
          <Route path='/login' element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }/>   
        </Routes>
        
         
      </BrowserRouter>

  )
}

export default App;

