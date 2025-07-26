import express from 'express';
import { getPeople, getPersonById } from '../data/data.js';
import { isValidUUID, handleError } from '../helpers.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  // Implement GET Request Method and send a JSON response  See lecture code!
  try {
    const people = await getPeople();
    res.json(people);
  } catch (error) {
    handleError(res, 500, 'Internal Server Error');
  }
});

router.route('/:id').get(async (req, res) => {
  // Implement GET Request Method and send a JSON response See lecture code!
  const { id } = req.params;
  
  // Validate UUID format
  if (!isValidUUID(id)) {
    return handleError(res, 400, 'Invalid ID format');
  }
  
  try {
    const person = await getPersonById(id);
    
    if (!person) {
      return handleError(res, 404, 'Person Not Found!');
    }
    
    res.json(person);
  } catch (error) {
    handleError(res, 500, 'Internal Server Error');
  }
});

export default router;