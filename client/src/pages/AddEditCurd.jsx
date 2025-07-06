import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import '../styles/Form.css';

function AddEditCurd({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    batchId: '',
    supplierName: '',
    quantityLiters: '',
    productionDate: '',
    expiryDate: '',
    status: 'Fresh',
    unitPrice: ''
  });

  useEffect(() => {
    if (edit && id) {
      const fetchBatch = async () => {
        const res = await axios.get('/curd');
        const data = res.data.find((b) => b.id === parseInt(id));

        if (data) {
          setForm({
            ...data,
            productionDate: formatDate(data.productionDate),
            expiryDate: formatDate(data.expiryDate)
          });
        }
      };
      fetchBatch();
    }
  }, [edit, id]);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await axios.put(`/curd/${id}`, form);
        alert('Batch updated successfully');
      } else {
        await axios.post('/curd', form);
        alert('Batch added successfully');
      }
      navigate('/curds');
    } catch (err) {
      alert('Submit failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{edit ? 'Edit' : 'Add'} Curd Batch</h2>

      <div className="form-group">
        <label>Batch ID:</label>
        <input name="batchId" value={form.batchId} onChange={handleChange} required disabled={edit} />
      </div>

      <div className="form-group">
        <label>Supplier Name:</label>
        <input name="supplierName" value={form.supplierName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Quantity (Liters):</label>
        <input name="quantityLiters" type="number" value={form.quantityLiters} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Unit Price:</label>
        <input name="unitPrice" type="number" value={form.unitPrice} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Production Date:</label>
        <input name="productionDate" type="date" value={form.productionDate} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Expiry Date:</label>
        <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Status:</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Fresh">Fresh</option>
          <option value="In-Process">In-Process</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      <button type="submit">{edit ? 'Update' : 'Submit'}</button>
    </form>
  );
}

export default AddEditCurd;
