import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/add/product')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

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
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          </div>

          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              imgUrl={`http://localhost:5000/uploads/${product.image}`} // Assuming image filename stored here
              title={product.name}
              price={product.price}
              description={product.des}
              brand={product.brand} // If available
              category={product.category} // If available
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
