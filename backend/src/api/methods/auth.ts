import { Router } from "express";
import StudentsClass from "../../models/Class";
import User, { UserType } from "../../models/User";
import jwt from "jsonwebtoken";
import GoogleOAuth from "../../utils/GoogleOAuth"
import "express-async-errors";

const router = Router();
const googleOAuth = new GoogleOAuth();

router.post('/register', async (req, res) => {
    // ONLY FOR DEV, DON'T USE IN PROD
    const email = req.body.email;
    const name = req.body.name;
    const className = req.body.class;

    const studentClass = await StudentsClass.findOne({
        where: {
            name: className,
        }
    });

    if(!studentClass) return res.status(404).json({error: "Class not found!"});
    
    let user = new User();
    user.name = name;
    user.email = email;
    user.type = UserType.student;
    user.userClass = studentClass;
    await user.save();
    
    return res.status(201).json(user);
});

router.get('/login', async (req, res) => {
    res.redirect(googleOAuth.oauthUrl);
    /* // ONLY FOR DEV, DON'T USE IN PROD
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
    }) */
});


router.get('/googlecallback', async (req, res) => {
    const code = req.query.code as string;
    const googlePayload = await googleOAuth.getUserFromCallback(code);
    const user = await User.fromGoogleOAuth(googlePayload);

    const token = jwt.sign({userId: user.id}, process.env.JWT_KEY);

    // Redirect the user to the app
    res.redirect(302, `ristorogv://login?token=${token}`);
})

export default router;