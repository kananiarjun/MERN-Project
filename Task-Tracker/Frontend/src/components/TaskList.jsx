import React, { useState } from 'react';
import axios from 'axios';


function TaskList({ tasks, refresh }) {
  const [openDetails, setOpenDetails] = useState({});

  const toggleComplete = async (task) => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      ...task,
      completed: !task.completed,
    });
    refresh();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    refresh();
  };

  const toggleDetails = (id) => {
    setOpenDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ol className="list-group">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="list-group-item task-item d-flex justify-content-between align-items-start flex-column"
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <h5
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    marginBottom: '0.5rem',
                  }}
                >
                  {task.title}
                </h5>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  title="Mark as complete"
                />
              </div>

              <button
                className="btn btn-sm btn-outline-primary mb-2"
                onClick={() => toggleDetails(task._id)}
              >
                {openDetails[task._id] ? 'Hide Details' : 'Show Details'}
              </button>

              {openDetails[task._id] && (
                <div className="task-details">
                  <p><strong>Description:</strong> {task.description || 'N/A'}</p>
                  <p><strong>Assigned To:</strong> {task.assignedTo || 'Unassigned'}</p>
                  <p><strong>Due Date:</strong> {task.dueDate ? task.dueDate.slice(0, 10) : 'None'}</p>
                </div>
              )}

              <button
                onClick={() => deleteTask(task._id)}
                className="delete-btn btn btn-danger mt-2 align-self-end"
              >
                🗑 Delete
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default TaskList;
