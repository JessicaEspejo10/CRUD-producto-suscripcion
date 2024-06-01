import { Router } from 'express';
import pool from '../database.js';


const prodRouter = Router();

prodRouter.get('/list-prod',async(req,res) => {
    try{
        const [result] = await pool.query('SELECT * FROM products');
        res.render('products/list-prod',{products: result});
    }catch(error){
        res.status(500).json({message: error.message});
    }
});




export default prodRouter;