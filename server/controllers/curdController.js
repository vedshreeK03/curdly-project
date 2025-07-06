const db = require('../config/db');

// CREATE
exports.createBatch = async (req, res) => {
  const {
    batchId, supplierName, quantityLiters,
    productionDate, expiryDate, status, unitPrice
  } = req.body;

  const createdBy = req.user.id;

  try {
    await db.execute(
      `INSERT INTO curd_batches 
      (batchId, supplierName, quantityLiters, productionDate, expiryDate, status, unitPrice, createdBy) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [batchId, supplierName, quantityLiters, productionDate, expiryDate, status, unitPrice, createdBy]
    );

    res.status(201).json({ message: 'Batch created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create batch', error: err.message });
  }
};

// READ ALL
exports.getAllBatches = async (req, res) => {
  try {
    const [batches] = await db.execute('SELECT * FROM curd_batches ORDER BY id ASC');
    res.json(batches);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch batches', error: err.message });
  }
};

// UPDATE
exports.updateBatch = async (req, res) => {
  const { id } = req.params;
  const {
    supplierName, quantityLiters,
    productionDate, expiryDate, status, unitPrice
  } = req.body;

  const modifiedBy = req.user.id;

  try {
    await db.execute(
      `UPDATE curd_batches SET 
      supplierName=?, quantityLiters=?, productionDate=?, expiryDate=?, status=?, unitPrice=?, modifiedBy=? 
      WHERE id=?`,
      [supplierName, quantityLiters, productionDate, expiryDate, status, unitPrice, modifiedBy, id]
    );
    res.json({ message: 'Batch updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// DELETE
exports.deleteBatch = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM curd_batches WHERE id = ?', [id]);
    res.json({ message: 'Batch deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};
