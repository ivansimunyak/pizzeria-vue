const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/',async(req,res,next)=>{
    try{
let results=await db.userAll();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id',async(req,res,next)=>{
    try{
let results=await db.userOne(req.params.id);
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/register',async(req,res,next)=>{
    console.log("register user "+req.body.name);
    try{
let results= db.registerUser(req.body.username,req.body.password,req.body.email,req.body.adress,req.body.name,req.body.phone_number,req.body.user_type_id,req.body.city_id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports=router;