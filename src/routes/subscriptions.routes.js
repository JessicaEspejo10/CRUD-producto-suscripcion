import {Router} from 'express';
import pool from '../database.js';

const subscRouter = Router();

subscRouter.get('/list-subsc', async(req,res) => {
    try{
        const [result] = await pool.query('SELECT * FROM suscribers');
        res.render('subscriptions/list-subsc', {suscribers:result})

    }catch(error){
        res.status(500).json({message: error.message});
    }
});

export default subscRouter;