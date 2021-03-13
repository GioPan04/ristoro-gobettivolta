import { Router } from "express";
import StudentsClass from "../../models/Class";
import User, { UserType } from "../../models/User";
import jwt from "jsonwebtoken";

const router = Router();

router.post('/register', async (req, res) => {
    // ONLY FOR DEV, DON'T USE IN PROD
    const email = req.body.email;
    const className = req.body.class;

    const studentClass = await StudentsClass.findOne({
        where: {
            name: className,
        }
    });

    if(!studentClass) return res.status(404).json({error: "Class not found!"});
    
    let user = new User();
    user.email = email;
    user.type = UserType.student;
    user.userClass = studentClass;
    await user.save();
    
    return res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    // ONLY FOR DEV, DON'T USE IN PROD
    const email = req.body.email;
    
    const user = await User.findOne({
        where: {
            email
        }
    });
    
    if(!user) return res.status(404).json({error: "User not found!"});
    
    const token = jwt.sign({userId: user.id}, process.env.JWT_KEY);

    res.json({
        token,
        user
    })
});

export default router;