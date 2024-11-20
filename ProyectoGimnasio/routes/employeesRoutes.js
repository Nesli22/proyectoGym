import { Router } from "express";
import { createMemberShip, getMemberShips, addProduct, getAllProducts , updateProductById, deleteProductById, updateReportById} from '../controllers/employeeControllers.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/membresia', authMiddleware, authorizeRoles('Administrador', 'Empleado'), createMemberShip);

router.get('/membresia', authMiddleware, authorizeRoles('Administrador', 'Empleado'), getMemberShips);

router.post('/producto', authMiddleware, authorizeRoles('Administrador', 'Empleado'), addProduct);

router.get('/producto', authMiddleware, authorizeRoles('Administrador', 'Empleado'), getAllProducts);

router.put('/producto/:id', authMiddleware, authorizeRoles('Administrador', 'Empleado'), updateProductById);

router.delete('/producto/:id', authMiddleware, authorizeRoles('Administrador', 'Empleado'), deleteProductById);

router.put('/queja/:id', authMiddleware,authorizeRoles('Administrador', 'Empleado'), updateReportById);

export default router;