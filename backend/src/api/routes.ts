import { Router } from "express";
import Food, { FoodType } from "../models/Food";

const router = Router();

router.get('/menu', (req, res) => {
    
    const menu: Food[] = [
        new Food("Salamella", FoodType.sandwich),
        new Food("Pepsi", FoodType.drink)
    ];
    
    res.json({
        menu
    });
});


export default router;