import { Router } from 'express';
import pool from '../database.js';


const subscRouter = Router();

subscRouter.get('/list-subsc', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM suscribers');
        res.render('subscriptions/list-subsc', { suscribers: result })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

subscRouter.get('/show-subsc', (req, res) => {
    res.render('subscriptions/show-subsc');
});


subscRouter.get('/add-subsc', (req, res) => {
    res.render('subscriptions/add-subsc', { value: req.query.value, suscription_type: req.query.suscription_type });
    
});

subscRouter.post('/add-subsc', async (req, res) => {
    
    try {

        const { subscname, lastname, email, suscription_type, value, billing_date } = req.body;
        let newSuscriber = {        
            subscname, lastname, email, suscription_type, value, billing_date
        }
        
        await pool.query('INSERT INTO suscribers SET ?', [newSuscriber]);
        res.json({ redirectUrl: '/list-subsc' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

subscRouter.get('/edit-subsc/:id', async(req,res) => {
    try{
        const{id} = req.params
        
        const [suscriber] = await pool.query('SELECT * FROM suscribers WHERE id = ?', [id]);
        
        const suscriberEdit = suscriber[0];
        res.render('subscriptions/edit-subsc',{suscriber: suscriberEdit});

    }catch(error){
        res.status(500).json({message: error.message});
    };
});

subscRouter.post('/edit-subsc/:id', async(req,res) => {
    try{
        const{id} = req.params
        const{subscname, lastname, email, suscription_type, value, billing_date} = req.body
        
        let editSuscriber =  {
            subscname, lastname, email, suscription_type, value, billing_date
            }
        
        await pool.query('UPDATE suscribers SET ? WHERE id = ?', [editSuscriber,id]);
        res.redirect('/list-subsc');

    }catch(error){
        res.status(500).json({message: error.message});
    }
});

export default subscRouter;