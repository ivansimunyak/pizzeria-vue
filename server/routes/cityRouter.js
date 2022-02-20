const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');

router.get('/',authenticateToken,async(req,res,next)=>{
    try{
let results=await db.city();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/addcity',authenticateToken,async(req,res,next)=>{
    console.log("insert city "+req.body.name);
    try{
let results= db.insertCity(req.body.name);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editcity',authenticateToken,async(req,res,next)=>{
    console.log("edit city "+req.body.id);
    try{
let results= db.editCity(req.body.name,req.body.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removecity/:id',authenticateToken,async(req,res,next)=>{
    console.log("remove city "+req.params.id);
    try{
let results= db.removeCity(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(" ")[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}


module.exports=router;