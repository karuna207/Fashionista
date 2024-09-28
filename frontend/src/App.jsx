import React from 'react' 
import { Routes,Route } from 'react-router-dom'
import Contact from './pages/Contact' 
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'  
import Cart from "./pages/Cart" 
import Orders from "./pages/Orders"
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">  
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/collection' element={<Collection/>}></Route> 
        <Route  path="/product/:productId" element={<Product/>}></Route> 
        <Route path="/login" element={<Login/>}></Route> 
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/place-order" element={<PlaceOrder/>}></Route> 
        <Route path="/orders" element={<Orders/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App
