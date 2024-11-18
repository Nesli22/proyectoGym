import { Router } from "express";
import { createCheckIn, getMemberShipById, createReport} from '../controllers/customerControllers.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/entrada', authMiddleware, authorizeRoles('Administrador', 'Cliente'), createCheckIn);

router.post('/membresia', authMiddleware, authorizeRoles('Administrador', 'Cliente'), getMemberShipById);

router.post('/queja', authMiddleware, authorizeRoles('Administrador', 'Cliente'), createReport); 

export default router;



