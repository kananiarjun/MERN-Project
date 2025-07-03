import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '' });

  const fetchProduct = () => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/products/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewForm),
    })
      .then((res) => res.json())
      .then(() => {
        setReviewForm({ name: '', comment: '' });
        fetchProduct(); // Refresh product with new reviews
      });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row mb-5">
        <div className="col-lg-6">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6">
          <h2>{product.name}</h2>
          <p>₹{product.price}</p>
          <p>{product.des}</p>
          <div className="d-flex gap-3 my-3">
            <Button title="Add to Cart" className="w-50" />
            <Button title="Buy Now" className="w-50" />
          </div>
        </div>
      </div>

      <hr />
      <h4>Add a Review</h4>
      <form onSubmit={handleReviewSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Your name"
          value={reviewForm.name}
          onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
          className="form-control mb-2"
          required
        />
        <textarea
          placeholder="Write your review"
          value={reviewForm.comment}
          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
          className="form-control mb-2"
          rows="3"
          required
        />
        <button className="btn btn-success">Submit Review</button>
      </form>

      <hr />
      <h4>Reviews</h4>
      {product.reviews && product.reviews.length > 0 ? (
        product.reviews
          .slice() // clone array
          .reverse()
          .map((rev, idx) => (
            <div key={idx} className="mb-3 p-3 border rounded shadow-sm">
              <strong>{rev.name}</strong>
              <p className="mb-1">{rev.comment}</p>
              <small className="text-muted">
                {new Date(rev.date).toLocaleString()}
              </small>
            </div>
          ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductDetail;
