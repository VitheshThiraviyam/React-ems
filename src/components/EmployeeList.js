import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users') // Fetching users as employees
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/add">Add New Employee</Link>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <h3>{employee.name}</h3>
            <p>Username: {employee.username}</p>
            <p>Email: {employee.email}</p>
            <Link to={`/edit/${employee.id}`}>Edit</Link>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
