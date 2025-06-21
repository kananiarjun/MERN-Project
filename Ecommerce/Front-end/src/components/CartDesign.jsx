import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'

const CartDesign = () => {
    return (
        <>
            <section className='cart-section' style={{ margin: "100px 0" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="cart-items">
                                <div className="cart-header mb-3">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h5>Product</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <h5>Price</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <h5>Quantity</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <h5>Total</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="product-info d-flex align-items-center justify-content-between ">
                                                <div className="product-image">
                                                    <img src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-2.webp" className='img-fluid' alt="" />
                                                </div>
                                                <div className="product-detail">
                                                    <h6 class="product-title">Lorem ipsum dolor sit amet</h6>
                                                    <div class="product-meta">
                                                        <span class="product-color">Color: Black</span>
                                                        <span class="product-size">Size: M</span>
                                                    </div>
                                                    <div className="remove-product">
                                                        <a href='#'><FaRegTrashCan /> Remove</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div class="price-tag">
                                                <span class="current-price">$89.99</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div class="item-total">
                                                <span>$89.99</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div class="item-total">
                                                <span>$89.99</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-3">
                            <div className="cart-summary">
                                <h4 class="summary-title">Order Summary</h4>
                                <div class="summary-item d-flex justify-content-between">
                                    <span class="summary-label">Subtotal</span>
                                    <span class="summary-value">$269.96</span>
                                </div>

                                <div class="summary-item shipping-item">
                                    <span class="summary-label">Shipping</span>
                                    <div class="shipping-options">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="shipping" id="standard" checked="" />
                                            <label class="form-check-label" for="standard">
                                                Standard Delivery - $4.99
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="shipping" id="express" />
                                            <label class="form-check-label" for="express">
                                                Express Delivery - $12.99
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="shipping" id="free" />
                                            <label class="form-check-label" for="free">
                                                Free Shipping (Orders over $300)
                                            </label>
                                        </div>
                                    </div>


                                </div>

                                <div class="summary-item">
                                    <span class="summary-label">Tax</span>
                                    <span class="summary-value">$27.00</span>
                                </div>

                                <div class="summary-item disc ">
                                    <span class="summary-label">Discount</span>
                                    <span class="summary-value">-$0.00</span>
                                </div>

                                <div class="summary-total">
                                    <span class="summary-label">Total</span>
                                    <span class="summary-value">$301.95</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CartDesign