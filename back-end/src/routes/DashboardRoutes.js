import { Router } from "express";
import { getDashboardData } from '../controllers/DashboardController.js'

const router = Router();

router.get('/', getDashboardData);

export default router;