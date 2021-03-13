import express, { Router } from "express";
import { MoreThan, MoreThanOrEqual } from "typeorm";
import StudentsClass from "../models/Class";
import Food, { FoodType } from "../models/Food";
import Order from "../models/Order";
import User, { UserType } from "../models/User";
import { authenticate } from "./AuthMiddleware";

const router = Router();

router.use(express.json());

router.get('/menu', async (req, res) => {
    
    const menu = await Food.find({
        where: {
            qtyAvaible: MoreThan(0)
        }
    });
    
    res.json({
        menu
    });
});

router.post('/menu/:id/order', authenticate, async (req, res) => {
    const food = await Food.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!food) return res.status(404).json({error: "Food not found!"});
    if(food.qtyAvaible < 1) return res.status(400).json({error: "No more quantity avaible"});

    const dummyUser = await User.findOne({
        where: {
            email: "gioele@pannetto.com"
        }
    });

    let order = await food.order(req.user!);

    res.json({
        orderId: order.id,
        food
    });
})

router.get('/orders', async (req, res) => {
    const today = new Date(new Date().setHours(0, 0, 0));
    const orders: Order[] = await Order.find({
        relations: ['user', 'user.userClass', 'food'],
        where: {
            orderedAt: MoreThanOrEqual(today)
        }
    });

    res.json(orders);
})

router.post('/food', async (req, res) => {
    const name: string = req.body.name;
    const type = FoodType.sandwich;
    const qty: number = req.body.quantity;
    const desc: string = req.body.description;

    if(
        !name ||
        !type ||
        !qty
    ) {
        res.status(400).json({error: "Bad request"})
        return;
    }

    let food = new Food();
    food.name = name;
    food.type = type;
    food.qtyAvaible = qty;
    food.description = desc;

    await food.save();

    res.status(201).json(food);
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