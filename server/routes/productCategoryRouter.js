const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/',async(req,res,next)=>{
    try{
let results=await db.productCategory();
res.json(results);
console.log("All good g")
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/addcategory',async(req,res,next)=>{
    console.log("insert category "+req.body.name);
    try{
let results= db.insertCategory(req.body.name);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removecategory/:id',async(req,res,next)=>{
    console.log("remove category "+req.params.id);
    try{
let results= db.removeCategory(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editcategory',async(req,res,next)=>{
    console.log("edit category "+req.body.id);
    try{
let results= db.editCategory(req.body.name,req.body.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports=router;