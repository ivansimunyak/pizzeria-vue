const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');

router.get('/',authenticateToken,async(req,res,next)=>{
    try{
let results=await db.productCategory();
res.json(results);
console.log("All good g")
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/addcategory',authenticateToken,async(req,res,next)=>{
    console.log("insert category "+req.body.name);
    try{
let results= db.insertCategory(req.body.name);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removecategory/:id',authenticateToken,async(req,res,next)=>{
    console.log("remove category "+req.params.id);
    try{
let results= db.removeCategory(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editcategory',authenticateToken,async(req,res,next)=>{
    console.log("edit category "+req.body.id);
    try{
let results= db.editCategory(req.body.name,req.body.id);
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

module.exports=router;