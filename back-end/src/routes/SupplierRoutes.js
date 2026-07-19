import { Router } from 'express';
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  searchSuppliers,
  updateSupplier,
  deleteSupplier
} from '../controllers/SupplierController.js';

const router = Router();

router.get('/search', searchSuppliers);
router.get('/', getSuppliers);
router.get('/:id', getSupplierById);
router.post('/', createSupplier);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;