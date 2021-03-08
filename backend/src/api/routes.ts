import { Router } from "express";
import { FoodType } from "../models/Food";
import OrderableFood from "../models/OrderableFood";

const router = Router();

router.get('/menu', (req, res) => {
    
    const menu: OrderableFood[] = [
        new OrderableFood("Salamella", FoodType.sandwich, 10),
        new OrderableFood("Pepsi", FoodType.drink, 6)
    ];
    
    res.json({
        menu
    });
});


export default router;