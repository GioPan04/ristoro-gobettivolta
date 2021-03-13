import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({error: "Unauthorized"});
    
    let userId: number;
    try {
        userId = (jwt.verify(token, process.env.JWT_KEY) as any).userId;
    } catch (e) {
        return res.status(401).json({error: "Unauthorized"});
    }

    const user = await User.findOne({
        relations: ['userClass'],
        where: {
            id: userId
        }
    });
    
    if(!user) return res.status(401).json({error: "Unauthorized"});

    req.user = user;
    next();
}