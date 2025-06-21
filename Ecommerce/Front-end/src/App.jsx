import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import AddProduct from './Admin/AddProduct';
import AddCategory from './Admin/AddCategory';



const App = () => {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Shop />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="admin/product" element={<AddProduct />} />
          <Route path="admin/category" element={<AddCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>



      {/* <Header />
      <div className="">
        <Banner />
        <Features />
        
      </div> */}
    </>
  )
}

export default App