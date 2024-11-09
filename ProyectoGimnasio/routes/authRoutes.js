import { Router } from "express";

import { login } from '../controllers/authControllers.js';

const router = Router();

router.get('/', login);               
           

export default router;