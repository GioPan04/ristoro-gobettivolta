import express, { Router } from "express";
import StudentsClass from "../models/Class";
import { FoodType } from "../models/Food";
import OrderableFood from "../models/OrderableFood";
import User, { UserType } from "../models/User";

const router = Router();

router.use(express.json());

router.get('/menu', (req, res) => {
    
    const menu: OrderableFood[] = [
        new OrderableFood("Salamella", FoodType.sandwich, 10),
        new OrderableFood("Pepsi", FoodType.drink, 6)
    ];
    
    res.json({
        menu
    });
});

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

router.post('/newclass', async (req, res) => {
    // ONLY FOR DEV, DON'T USE IN PROD
    const className = req.body.name;

    let studentClass = new StudentsClass();
    studentClass.name = className;

    await studentClass.save();

    res.status(201).json(studentClass);
});

router.get('/classes/:id', async (req, res) => {
    const studentClass = await StudentsClass.findOne({
        relations: ['students'],
        where: {
            id: req.params.id,
        },
    });

    if(!studentClass) return res.status(404).json({error: "Class not found!"});

    res.json(studentClass);
});

export default router;