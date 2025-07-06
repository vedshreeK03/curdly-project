import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [batches, setBatches] = useState([]);
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role')?.toLowerCase();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/curd')
      .then((res) => setBatches(res.data))
      .catch(() => alert('Failed to load curd data.'));
  }, []);

  const getDateOnly = (dateStr) => {
    const dateObj = new Date(dateStr);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  };

  const todayDate = getDateOnly(new Date());

  const totalBatches = batches.length;
  const todaysProduction = batches.filter(b => getDateOnly(b.productionDate) === todayDate).length;
  const stockInHand = batches.reduce((acc, cur) => cur.status === 'Fresh' ? acc + Number(cur.quantityLiters) : acc, 0);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {name}</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="summary-cards">
        <div><h3>Total Batches</h3><p>{totalBatches}</p></div>
        <div><h3>Today's Production</h3><p>{todaysProduction}</p></div>
        <div><h3>Stock In Hand (L)</h3><p>{stockInHand}</p></div>
      </div>

      <hr />

      <Link to="/curds"><button>Manage Curd Batches</button></Link>

      {role === 'admin' && (
        <div style={{ marginTop: '20px' }}>
          <Link to="/register"><button>Add New User</button></Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
