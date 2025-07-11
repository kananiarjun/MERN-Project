import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // new state for categories
  const [loading, setLoading] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/add/product');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    Promise.all([fetchCategories(), fetchProducts()]).then(() => {
      setLoading(false);
    });
  }, []);

  // Helper to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : 'N/A';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="text-center mb-4">
            <h2>Best Sellers</h2>
            <p>Maintaining strict hygiene protocols to ensure safe handling, packaging, and delivery of every order.</p>
          </div>

          {products.map((product) => (
            <Card
              key={product._id} // Changed from product.id to product._id to match your product id
              id={product._id}
              imgUrl={`http://localhost:5000/uploads/${product.image}`}

              title={product.name}
              price={product.price}
              description={product.des}
              brand={product.brand}
              category={getCategoryName(product.category)} // Map category id to name here
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
