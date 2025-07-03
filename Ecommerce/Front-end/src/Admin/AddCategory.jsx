import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.trim()) {
      alert('Please enter a category name');
      return;
    }
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/categories', { name: category.trim() });
      alert('Category added successfully');
      setCategory('');
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '20px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category" style={{ display: 'block', marginBottom: 5 }}>
          Category Name:
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          disabled={loading}
          style={{ width: '100%', padding: 8, marginBottom: 15 }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
