import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const email = req.headers.email;
    if(!email) return res.status(401).json({error: "Unauthorized"});
    
    const user = await User.findOne({
        relations: ['userClass'],
        where: {
            email: email
        }
    });
    
    if(!user) return res.status(401).json({error: "Unauthorized"});

    req.user = user;
    next();
} 