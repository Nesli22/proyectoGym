import { Router } from "express";
import { createCheckIn, getMemberShipById, createReport} from '../controllers/customerControllers.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/checkin', authMiddleware, authorizeRoles('Administrador', 'Cliente'), createCheckIn);

router.get('/membership/:id', authMiddleware, authorizeRoles('Administrador', 'Cliente'), getMemberShipById);

router.post('/report', authMiddleware, authorizeRoles('Administrador', 'Cliente'), createReport); 


export default router;
