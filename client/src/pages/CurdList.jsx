import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import '../styles/List.css';

function CurdList() {
  const [batches, setBatches] = useState([]);
  const [filter, setFilter] = useState({ status: '', supplier: '', search: '' });
  const navigate = useNavigate();

  const fetchBatches = async () => {
    try {
      const res = await axios.get('/curd');
      setBatches(res.data);
    } catch (err) {
      alert('Failed to load batches');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this batch?')) {
      await axios.delete(`/curd/${id}`);
      fetchBatches();
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // filter logic
  const filtered = batches.filter(batch => {
    return (
      (filter.status ? batch.status === filter.status : true) &&
      (filter.supplier ? batch.supplierName.toLowerCase().includes(filter.supplier.toLowerCase()) : true) &&
      (filter.search ? batch.batchId.includes(filter.search) : true)
    );
  });

  return (
    <div>
      <h2>Curd Batches</h2>
      <button onClick={() => navigate('/curds/new')}>Add New</button>

      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <input placeholder="Search by Batch ID" onChange={e => setFilter({ ...filter, search: e.target.value })} />
        <input placeholder="Filter by Supplier" onChange={e => setFilter({ ...filter, supplier: e.target.value })} />
        <select onChange={e => setFilter({ ...filter, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="Fresh">Fresh</option>
          <option value="In-Process">In-Process</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Supplier</th>
            <th>Quantity (L)</th>
            <th>Status</th>
            <th>Production</th>
            <th>Expiry</th>
            <th>Unit Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((batch) => (
            <tr key={batch.id}>
              <td>{batch.batchId}</td>
              <td>{batch.supplierName}</td>
              <td>{batch.quantityLiters}</td>
              <td>{batch.status}</td>
              <td>{batch.productionDate}</td>
              <td>{batch.expiryDate}</td>
              <td>{batch.unitPrice}</td>
              <td>
                <button onClick={() => navigate(`/curds/edit/${batch.id}`)}>Edit</button>
                <button onClick={() => handleDelete(batch.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan="8">No Data Found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default CurdList;
