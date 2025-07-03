import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useCart } from '../context/CartCOntext';

const CartDesign = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 300 ? 0 : 4.99;
  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping;

  return (
    <section className="cart-section" style={{ margin: '100px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="cart-items">
              <div className="cart-header mb-3">
                <div className="row">
                  <div className="col-lg-6"><h5>Product</h5></div>
                  <div className="col-lg-2"><h5>Price</h5></div>
                  <div className="col-lg-2"><h5>Quantity</h5></div>
                  <div className="col-lg-2"><h5>Total</h5></div>
                </div>
              </div>

              {cartItems.map((item) => (
                <div className="cart-item mb-3" key={item.id}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="product-info d-flex align-items-center justify-content-between">
                        <div className="product-image">
                          <img src={item.imgUrl} className="img-fluid" alt={item.title} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                        </div>
                        <div className="product-detail ms-2">
                          <h6 className="product-title">{item.title}</h6>
                          <div className="remove-product">
                            <button onClick={() => removeFromCart(item.id)} className="btn btn-link p-0 text-danger">
                              <FaRegTrashCan /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <div className="col-lg-2">
                      <span>{item.quantity}</span>
                    </div>
                    <div className="col-lg-2">
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-1"></div>

          <div className="col-lg-3">
            <div className="cart-summary">
              <h4 className="summary-title">Order Summary</h4>

              <div className="summary-item d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-item d-flex justify-content-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="summary-item d-flex justify-content-between">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-total d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <button className="btn btn-primary w-100">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartDesign;
