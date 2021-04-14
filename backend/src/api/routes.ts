import express, { NextFunction, Request, Response, Router } from "express";

import menuApi from "./methods/menu";
import adminApi from "./methods/admin";
import authApi from "./methods/auth";

const router = Router();

router.use(express.json());

router.use('/menu', menuApi);
router.use('/admin', adminApi);
router.use('/auth', authApi);

router.all('*', (req, res) => {
    res.status(404).json({ error: true, statusCode: 404 });
});

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ error: true, statusCode: 500 });
});

export default router;