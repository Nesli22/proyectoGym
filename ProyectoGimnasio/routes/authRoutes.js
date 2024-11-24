import { Router } from "express";
import { login, checkTokenValidity } from '../controllers/authControllers.js';

const router = Router();

router.post('/', login);

router.post('/token', checkTokenValidity);

export default router;
