import { Router } from 'express';
import pool from '../database.js';
import multer from 'multer';
import path from 'path';

const prodRouter = Router();

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req,file,cb) => {
        const uniqueSuffix = Date.now() + '-' +  Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({storage});

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

prodRouter.post('/add-prod', upload.single('file'), async(req,res) => {
    try{
        const {prodname,size,color,brand,description,price} = req.body;
        
        let newProduct= {};
        
        if(req.file){
            
            const file = req.file;   
            const original_imgname = file.originalname;          
            const image = file.filename;

            newProduct = {
                prodname,size,color,brand,description,price,image
            }
        }else{
            newProduct = {
                prodname,size,color,brand,description,price
            }
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

prodRouter.post('/edit-prod/:id', upload.single('file'), async(req,res) => {
    try{
        const{id} = req.params
        console.log(req.body)
        const{prodname,size,color,brand,description,price} = req.body
        
        let editProduct =  {}

        if(req.file){
            const file = req.file;   
            const original_imgname = file.originalname;           
            const image = file.filename;
            console.log(file)
            editProduct = {
                prodname,size,color,brand,description,price,image
            }
        }else{
            editProduct = {
                prodname,size,color,brand,description,price
            }
        }
        await pool.query('UPDATE products SET ? WHERE id = ?', [editProduct,id]);
        res.redirect('/list-prod');

    }catch(error){
        res.status(500).json({message: error.message});
    }
});

prodRouter.get('/delete-prod/:id', async(req,res) => {
    try{
        const {id} = req.params
        await pool.query('DELETE FROM products WHERE id=?', [id]);
        res.redirect('/list-prod');
    }catch(error){
        res.status(500).json({message: error.message});
    };
});

export default prodRouter;