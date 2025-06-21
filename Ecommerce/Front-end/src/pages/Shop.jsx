import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

const Shop = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
      setProducts(data.products)
      setLoading(false)
    })
    .catch(error => console.log(error))
  },[])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
        <div className="container my-3">
          <div className="row ">
            <div className="text-center">
              <h2>Best Sellers</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
            
            {
              products.map((product) => {
                return (
                  <Card key={product.id} id={product.id} imgUrl={product.images} title={product.title} price={product.price} brand={product.brand} category={product.category}  />
                )
              })
            }

          </div>
        </div>
    </>
  )
}

export default Shop