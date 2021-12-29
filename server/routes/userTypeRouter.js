const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/',async(req,res,next)=>{
    try{
let results=await db.userType();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/addtype',async(req,res,next)=>{
    console.log("insert type "+req.body.name);
    try{
let results= db.insertType(req.body.name);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/edittype',async(req,res,next)=>{
    console.log("edit type "+req.body.id);
    try{
let results= db.editType(req.body.name,req.body.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removetype/:id',async(req,res,next)=>{
    console.log("remove type "+req.params.id);
    try{
let results= db.removeType(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports=router;