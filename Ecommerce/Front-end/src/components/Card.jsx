import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';

const Card = ({ _id, title, imgUrl, price, brand, category }) => {

  const handleAddToCart = () => {
    alert(`Added "${title}" to cart!`);
    // Here you can call your addToCart logic
  };

  const handleAddToWishlist = () => {
    alert(`Added "${title}" to wishlist!`);
    // Here you can call your addToWishlist logic
  };

  return (
    <div className="col-lg-4 mb-4">
      <div className="card shadow-sm h-100">
          <Link
            to={`/products/${_id}`}
            className="btn btn-outline-primary d-flex align-items-center"
            style={{ fontSize: '18px', padding: '10px 16px', width: '120px' }}
          >
            <FaEye className="me-1" /> View
          </Link>
        <img
          src={Array.isArray(imgUrl) ? imgUrl[0] : imgUrl}
          className="card-img-top"
          alt={title}
          style={{ height: '400px', objectFit: 'cover' }}
        />

        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h6 className="text-muted text-uppercase mb-1">{category}</h6>
            <h5 className="card-title">{title}</h5>
            <p className="card-text mb-1">Brand: {brand}</p>
            <p className="card-text fw-bold">₹{price}</p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2 w-50">

            <button
              onClick={handleAddToWishlist}
              className="btn btn-outline-danger btn-sm d-flex align-items-center"
            >
              <FaHeart className="me-1" /> Wishlist
            </button>

            <button
              onClick={handleAddToCart}
              className="btn btn-outline-success btn-sm d-flex align-items-center"
            >
              <FaShoppingCart className="me-1" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
