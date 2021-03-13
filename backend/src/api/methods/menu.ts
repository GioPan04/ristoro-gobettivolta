import { Router } from "express";
import { MoreThan } from "typeorm";
import Food from "../../models/Food";
import { authenticate } from "../AuthMiddleware";

const router = Router();

router.get('/', async (req, res) => {
    
    const menu = await Food.find({
        where: {
            qtyAvaible: MoreThan(0)
        }
    });
    
    res.json({
        menu
    });
});

router.post('/:id/order', authenticate, async (req, res) => {
    const food = await Food.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!food) return res.status(404).json({error: "Food not found!"});
    if(food.qtyAvaible < 1) return res.status(400).json({error: "No more quantity avaible"});

    let order = await food.order(req.user!);

    res.json({
        orderId: order.id,
        food
    });
});

export default router;