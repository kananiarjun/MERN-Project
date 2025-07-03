import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Layout and Pages
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import SignUp from './pages/Signup';
import Login from './pages/Login';

// Admin Pages
import AddProduct from './Admin/AddProduct';
import AddCategory from './Admin/AddCategory';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Pages */}
        <Route index element={<Home />} />
        <Route path="products" element={<Shop />} />
        <Route path="shop" element={<Shop />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        {/* Admin Pages */}
        <Route path="admin/product" element={<AddProduct />} />
        <Route path="admin/category" element={<AddCategory />} />
      </Route>
    </Routes>
  );
};

export default App;
