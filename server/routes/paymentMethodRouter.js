const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');

router.get('/',authenticateEmployeeToken,async(req,res,next)=>{
    try{
let results=await db.paymentMethod();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/forall',async(req,res,next)=>{
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
router.post('/addpaymentmethod',authenticateToken,async(req,res,next)=>{
    try{
let results= db.insertPaymentMethod(req.body.name);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editpaymentmethod',authenticateToken,async(req,res,next)=>{
    try{
let results= db.editPaymentMethod(req.body.name,req.body.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removepaymentmethod/:id',authenticateToken,async(req,res,next)=>{
    try{
let results= db.removePaymentMethod(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(" ")[1]
    if(token==null) return res.sendStatus(403)
    jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN,(err,user)=>{
        if(err) return res.sendStatus(401)
        req.user=user
        next()
    })
}
function authenticateEmployeeToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(" ")[1]
    if(token==null) return res.sendStatus(403)
    jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN,(err,user)=>{
        if(err) {
            jwt.verify(token,process.env.EMPLOYEE_ACCESS_TOKEN,(err,user)=>{
                if(err) return res.sendStatus(401)
                req.user=user
                next()
            })
        }else{
        req.user=user
        next()
        }
    })
}
module.exports=router;