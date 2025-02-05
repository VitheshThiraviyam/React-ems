import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddEmployee() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();  // useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { name, username, email };

    axios
      .post('https://jsonplaceholder.typicode.com/users', newEmployee)
      .then(() => {
        navigate('/');  // Navigate to the employee list after adding
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
