import express from 'express';
import { getStocks, getStockById } from '../data/data.js';
import { isValidUUID, handleError } from '../helpers.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
 
  try {
    const stocks = await getStocks();
    res.json(stocks);
  } catch (error) {
    handleError(res, 500, 'Internal Server Error');
  }
});

router.route('/:id').get(async (req, res) => {
  
  const { id } = req.params;
  
  // Validate UUID format
  if (!isValidUUID(id)) {
    return handleError(res, 400, 'Invalid ID format');
  }
  
  try {
    const stock = await getStockById(id);
    
    if (!stock) {
      return handleError(res, 404, 'Stock Not Found!');
    }
    
    res.json(stock);
  } catch (error) {
    handleError(res, 500, 'Internal Server Error');
  }
});

export default router;