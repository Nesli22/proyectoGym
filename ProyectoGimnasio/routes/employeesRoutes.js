import { Router } from "express";
import { createMemberShip, getMemberShips, addProduct, getAllProducts , updateProduct, deleteProduct} from '../controllers/employeeControllers.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/membresia', authMiddleware, authorizeRoles('Administrador', 'Empleado'), createMemberShip);

router.get('/membresia', authMiddleware, authorizeRoles('Administrador', 'Empleado'), getMemberShips);

router.post('/producto', authMiddleware, authorizeRoles('Administrador', 'Empleado'), addProduct);

router.get('/producto', authMiddleware, authorizeRoles('Administrador', 'Empleado'), getAllProducts);

router.put('/producto', authMiddleware, authorizeRoles('Administrador', 'Empleado'), updateProduct);

router.delete('/producto', authMiddleware, authorizeRoles('Administrador', 'Empleado'), deleteProduct);

export default router;