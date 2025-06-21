import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', {
      title,
      description,
      assignedTo,
      dueDate,
    });

    // Reset form fields
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setDueDate('');

    // Refresh task list
    onTaskAdded();
  };

  return (
    <form onSubmit={addTask} className="d-flex flex-column gap-2 mb-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-control"
        rows={3}
      />

      <input
        type="text"
        placeholder="Assign To (User Name)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="form-control"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="form-control"
      />

      <button className="btn btn-primary">Add ➕</button>
    </form>
  );
}

export default TaskForm;
