const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/',async(req,res,next)=>{
    try{
let results=await db.paymentMethod();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/:id',async(req,res,next)=>{
    try{
let results=await db.paymentMethodOne(req.params.id);
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/addpaymentmethod',async(req,res,next)=>{
    console.log("insert payment method "+req.body.name);
    try{
let results= db.insertPaymentMethod(req.body.name);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editpaymentmethod',async(req,res,next)=>{
    console.log("edit payment method "+req.body.id);
    try{
let results= db.editPaymentMethod(req.body.name,req.body.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removepaymentmethod/:id',async(req,res,next)=>{
    console.log("remove payment method "+req.params.id);
    try{
let results= db.removePaymentMethod(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports=router;