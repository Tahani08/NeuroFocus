// src/ToDoList.jsx

import React, { useState } from 'react';
import './ToDoList.css';

export default function ToDoList() {
  const [tasks, setTasks] = useState(Array(10).fill(''));
  const [checked, setChecked] = useState(Array(10).fill(false));

  const handleChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const toggleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  return (
    <div className="card todo-list">
      <h4>To-Do List</h4>
      {tasks.map((task, index) => (
        <div key={index} className="todo-item">
          <input
            type="checkbox"
            checked={checked[index]}
            onChange={() => toggleCheck(index)}
          />
          <input
            type="text"
            value={task}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Task ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

