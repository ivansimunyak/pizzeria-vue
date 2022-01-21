const express=require('express');
const router=express.Router();
const db=require('../db');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'src/assets');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
  });  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    }
  });
  



router.get('/',async(req,res,next)=>{
    try{
let results=await db.getProducts();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    } 
});
router.post('/addproduct',upload.single('productImage'),async(req,res,next)=>{
    console.log("insert product "+req.body.name);
    try{
let results= db.insertProduct(req.body.name,req.body.size,req.body.price,req.body.category_id,req.file.filename);
 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removeproduct/:id/:imgname',async(req,res,next)=>{
    console.log("remove product "+req.params.imgname);
    let path='src/assets/'+req.params.imgname;
    fs.unlinkSync(path)
    try{
let results= db.removeProduct(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editproductimg',upload.single('productImage'),async(req,res,next)=>{
    console.log("edit product bro "+req.body.name);
    try{
let results= db.editProductWithImage(req.body.name,req.body.size,req.body.price,req.body.product_category_id,req.file.filename,req.body.id);
 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/:id',async(req,res,next)=>{
    try{
let results=await db.productOne(req.params.id);
console.log("get one product" + req.params.id)
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editproduct',async(req,res,next)=>{
    console.log("edit product "+req.body.name);
    try{
let results= db.editProduct(req.body.name,req.body.size,req.body.price,req.body.product_category_id,req.body.id);
 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports=router;