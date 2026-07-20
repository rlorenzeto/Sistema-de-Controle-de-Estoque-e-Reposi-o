import { Router } from "express";
import { changePassword, getUser } from "../controllers/PerfilController.js"

const router = Router();

router.get('/get-user', getUser);
router.put('/change-password', changePassword)

export default router;