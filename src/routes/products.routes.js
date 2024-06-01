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

prodRouter.get('/add-prod', (req,res) => {
    res.render('products/add-prod');
});


prodRouter.post('/add-prod',  async(req,res) => {
    try{
        const {prodname,size,color,brand,description,price} = req.body;
        let newProduct= {
                prodname,size,color,brand,description,price
            }
        
        await pool.query('INSERT INTO products SET ?', [newProduct]);
        
        res.redirect('/list-prod');

    }catch(error){
        res.status(500).json({message: error.message});
    }
});

prodRouter.get('/edit-prod/:id', async(req,res) => {
    try{
        const{id} = req.params
        
        const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        
        const productEdit = product[0];
       
        res.render('products/edit-prod',{product: productEdit});

    }catch(error){
        res.status(500).json({message: error.message});
    };
});

prodRouter.post('/edit-prod/:id', async(req,res) => {
    try{
        const{id} = req.params
        const{prodname,size,color,brand,description,price} = req.body
        
        let editProduct =  {
            prodname,size,color,brand,description,price
            }
        
        await pool.query('UPDATE products SET ? WHERE id = ?', [editProduct,id]);
        res.redirect('/list-prod');

    }catch(error){
        res.status(500).json({message: error.message});
    }
});


export default prodRouter;