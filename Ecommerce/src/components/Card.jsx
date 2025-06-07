import React from 'react'
import { FaEye, FaStar } from 'react-icons/fa6'
import Button from './Button'
import { Link } from 'react-router-dom'

const Card = ({id, imgUrl, title, price, brand, category}) => {
    return (
        <>
            <div className="col-lg-3">
                <div className="product-card position-relative">
                    <div className="category">
                        <span>{category}</span>
                    </div>
                    <div className="viewicon">
                        <Link to={`/products/${id}`}>
                            <FaEye />
                        </Link>
                    </div>
                    <div className="product-image">
                        <img src={imgUrl} alt="" className='img-fluid' />
                    </div>
                    <div className="product-info">

                        <h3 class="product-title"><a href="product-details.html">{brand}</a></h3>
                        <h3 class="product-title"><a href="product-details.html">{title}</a></h3>
                        <div class="product-price">
                            <span class="current-price">${price}</span>
                        </div>
                        <div className="product-rating">
                            <FaStar className='star' />
                            <FaStar className='star' />
                            <FaStar className='star' />
                            <FaStar className='star' />
                        </div>
                        <Button className={"w-100"} title={"Add to Cart"}  />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card