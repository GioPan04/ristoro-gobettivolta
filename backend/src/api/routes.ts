import express, { Router } from "express";

import menuApi from "./methods/menu";
import adminApi from "./methods/admin";
import authApi from "./methods/auth";

const router = Router();

router.use(express.json());

router.use('/menu', menuApi);
router.use('/admin', adminApi);
router.use('/auth', authApi);

export default router;