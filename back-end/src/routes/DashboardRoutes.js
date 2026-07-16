import { Router } from "express";
import { getDashboardData, repla } from '../controllers/DashboardController.js'

const router = Router();

router.get('/', getDashboardData);
router.post('/replacement', replacement);

export default router;