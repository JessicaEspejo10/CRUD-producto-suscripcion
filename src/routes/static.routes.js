import { Router } from 'express';
import pool from '../database.js';


const stRouter = Router();


stRouter.get('/aboutus', (req,res) => {
    res.render('static/aboutus');
});

export default stRouter;