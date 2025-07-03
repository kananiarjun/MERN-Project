import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  // Added brand to form state
  const [form, setForm] = useState({ name: '', price: '', des: '', category: '', brand: '' });
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (error) {
      alert('Error fetching categories');
    }
  };



  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/add/product');
      const productsWithId = res.data.map((p) => ({ ...p, id: p._id }));
      setProducts(productsWithId);
    } catch (error) {
      alert('Error fetching products');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('des', form.des);
    formData.append('category', form.category);
    formData.append('brand', form.brand); // Append brand
    if (image) formData.append('image', image);

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/add/product/${editingId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('Product updated successfully');
      } else {
        await axios.post(
          'http://localhost:5000/api/add/product',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('Product added successfully');
      }
      setForm({ name: '', price: '', des: '', category: '', brand: '' });
      setImage(null);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      des: product.des,
      category: product.category || '',
      brand: product.brand || '',  // Set brand in edit
    });
    setEditingId(product.id);
    setImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/add/product/${id}`);
        alert('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <>
      <style>{`
        /* Your existing styles here */
        .container {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #fafafa;
          font-family: Arial, sans-serif;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-top: 15px;
          font-weight: 600;
        }
        input[type="text"],
        input[type="number"],
        input[type="file"],
        select {
          margin-top: 5px;
          padding: 8px;
          font-size: 1rem;
          border: 1px solid #bbb;
          border-radius: 4px;
        }
        button {
          margin-top: 25px;
          padding: 10px;
          font-size: 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #0056b3;
        }
        h2 {
          text-align: center;
          margin: 40px 0 20px;
          font-weight: 700;
          color: #333;
        }
        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }
        .product-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          position: relative;
        }
        .product-card img {
          width: 100%;
          height:300px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .product-card h3 {
          font-size: 1.1rem;
          margin: 0 0 8px;
          color: #222;
        }
        .product-card p {
          margin: 5px 0;
          font-size: 0.9rem;
          color: #555;
        }
        .product-price {
          font-weight: 700;
          color: #007bff;
          margin-bottom: 10px;
        }
        .btn-group {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .btn-edit,
        .btn-delete {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          color: white;
          transition: background-color 0.3s ease;
        }
        .btn-edit {
          background-color: #28a745;
        }
        .btn-edit:hover {
          background-color: #1e7e34;
        }
        .btn-delete {
          background-color: #dc3545;
        }
        .btn-delete:hover {
          background-color: #a71d2a;
        }
      `}</style>

      <div className="container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Product Image {editingId ? '(upload to replace image)' : ''}
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            {...(!editingId && { required: true })}
          />

          <label>Product Name:</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label>Product Description:</label>
          <input
            type="text"
            value={form.des}
            onChange={(e) => setForm({ ...form, des: e.target.value })}
            required
          />

          <label>Product Price:</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <label>Category:</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={p.category}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* New Brand field */}
          <label>Brand:</label>
          <input
            type="text"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            required
          />

          <button type="submit">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <h2>All Products</h2>
        <div className="product-list">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
              />
              <h3>{p.name}</h3>
              <p>{p.des}</p>
              <p><strong>Brand:</strong> {p.brand || 'N/A'}</p> {/* Display brand */}
              <p className="product-price">₹{p.price}</p>
              <p><strong>Category:</strong> {p.category || 'N/A'}</p>
              <div className="btn-group">
                <button className="btn-edit" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
