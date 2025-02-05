import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setName(response.data.name);
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error('Error fetching employee:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = { name, username, email };

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedEmployee)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
      });
  };

  return (
    <div>
      <h2>Edit Employee</h2>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditEmployee;
