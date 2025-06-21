import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

const AddProduct = () => {
    const [form, setForm] = useState({
        name: "",
        price: "",
        des: ""
    })
    const [products, setProducts] = useState([]);

    const AllProducts = async () => {

        try {
            const res = await axios.get("http://localhost:3000/api/add/product");
            setProducts(res.data);
        }
        catch (err) {
            alert(err)
        }
    }

    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("des", form.des);
        formData.append("image", image);

        try {
            console.log(formData, "formData");

            await axios.post("http://localhost:3000/api/add/product", formData);
            alert("Added product Successfully");
        }
        catch {
            alert("Fail to add product")
        }
    }

    useEffect(() => {
        AllProducts()
    }, [])
console.log(products);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Product Image : </label>
                <input type='file' onChange={(e) => setImage(e.target.files[0])} /><br />
                <label>Product Name : </label>
                <input type='text' name='name' onChange={((e) => setForm({ ...form, name: e.target.value }))} /><br />
                <label>Product Description : </label>
                <input type='text' name='des' onChange={((e) => setForm({ ...form, des: e.target.value }))} /><br />
                <label>Product Price</label>
                <input type='number' name='price' onChange={((e) => setForm({ ...form, price: e.target.value }))} /><br />
                <button type='submit'>Submit</button>
            </form>


            {
            
                products.map((p) => (
                    <>
                        <img src={`http://localhost:3000/uploads/${p.image}`} />
                        <h1>Product Name : {p.name}</h1>
                        <h1>Product Price : {p.price}</h1>
                        <button>Edit</button>
                        <button>Delete</button><br/>
                    </>
                ))
            }
        </div>
    )
}

export default AddProduct
