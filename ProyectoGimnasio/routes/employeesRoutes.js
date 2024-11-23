import { Router } from "express";
import {
  createMemberShip,
  getMemberShips,
  addProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  updateReportById,
  createPayment,
  getReports
} from "../controllers/employeeControllers.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/membresia",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  createMemberShip
);

router.get(
  "/membresia",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  getMemberShips
);

router.put(
  "/queja/:id",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  updateReportById
);

router.post(
  "/pago",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  createPayment
);

router.get(
  "/queja",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  getReports
);

router.post(
  "/producto",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  addProduct
);

router.get(
  "/producto",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  getAllProducts
);

router.put(
  "/producto/:id",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  updateProductById
);

router.delete(
  "/producto/:id",
  authMiddleware,
  authorizeRoles("Administrador", "Empleado"),
  deleteProductById
);

export default router;
