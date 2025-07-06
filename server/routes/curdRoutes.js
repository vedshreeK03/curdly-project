const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {
  createBatch,
  getAllBatches,
  updateBatch,
  deleteBatch
} = require('../controllers/curdController');

router.post('/', verifyToken, createBatch);
router.get('/', verifyToken, getAllBatches);
router.put('/:id', verifyToken, updateBatch);
router.delete('/:id', verifyToken, deleteBatch);

module.exports = router;
