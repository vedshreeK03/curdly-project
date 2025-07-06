import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import '../styles/Form.css';

function RegisterUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff'
  });

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
      alert('Access denied. Admins only!');
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users/register', form);
      alert('User registered successfully');
      setForm({ name: '', email: '', password: '', role: 'staff' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register New User</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterUser;
