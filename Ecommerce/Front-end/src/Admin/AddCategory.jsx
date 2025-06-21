import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const AddCategory = () => {
    const [category, setCategory] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/categories", { name: category });
            alert("Added category Successfully");
        }
        catch (err) {
            alert(err)
        }
    }
    return (
            <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="category" style={{ display: 'block', marginBottom: '5px' }}>
                        Category Name:
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        placeholder="Enter category name"
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>
                    Submit
                </button>
            </form>
        </div>
        
    )
}

export default AddCategory
