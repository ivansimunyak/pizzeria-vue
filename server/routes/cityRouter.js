const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/',async(req,res,next)=>{
    try{
let results=await db.city();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/addcity',async(req,res,next)=>{
    console.log("insert city "+req.body.name);
    try{
let results= db.insertCity(req.body.name);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editcity',async(req,res,next)=>{
    console.log("edit city "+req.body.id);
    try{
let results= db.editCity(req.body.name,req.body.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removecity/:id',async(req,res,next)=>{
    console.log("remove city "+req.params.id);
    try{
let results= db.removeCity(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports=router;