import { Router } from "express";
import { MoreThanOrEqual } from "typeorm";
import StudentsClass from "../../models/Class";
import Food, { FoodType } from "../../models/Food";
import Order from "../../models/Order";
import { authenticate } from "../AuthMiddleware";

const router = Router();

router.get('/orders', authenticate, async (req, res) => {
    const today = new Date(new Date().setHours(0, 0, 0));
    const orders: Order[] = await Order.find({
        relations: ['user', 'user.userClass', 'food'],
        where: {
            orderedAt: MoreThanOrEqual(today)
        }
    });

    res.json(orders);
})

router.post('/addFood', authenticate, async (req, res) => {
    const name: string = req.body.name;
    const type = FoodType.sandwich;
    const qty: number = req.body.quantity;
    const desc: string = req.body.description;
    const imageUrl: string = req.body.imageUrl;

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
    food.imageUrl = imageUrl;

    await food.save();

    res.status(201).json(food);
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