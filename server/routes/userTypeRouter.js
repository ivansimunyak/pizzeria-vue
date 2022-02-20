const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');

router.get('/',authenticateToken,async(req,res,next)=>{
    try{
let results=await db.userType();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/customertype',async(req,res,next)=>{
    try{
let results=await db.getCustomerType();
console.log("called mee")
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/addtype',authenticateToken,async(req,res,next)=>{
    console.log("insert type "+req.body.name);
    try{
let results= db.insertType(req.body.name);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/edittype',authenticateToken,async(req,res,next)=>{
    console.log("edit type "+req.body.id);
    try{
let results= db.editType(req.body.name,req.body.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removetype/:id',authenticateToken,async(req,res,next)=>{
    console.log("remove type "+req.params.id);
    try{
let results= db.removeType(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/getadmin/:type_id/:user_id',async(req,res,next)=>{
    console.log("get admin in usertyperouter typeid:"+ req.params.type_id+"user id : "+req.params.user_id)
    try{
let results= await db.getAdmin(req.params.type_id,req.params.user_id);
if(results==""){
    res.sendStatus(403);
    return res.json(false)
}
const userType=results[0].name;
var isAdmin=false;
if(userType=='Admin'){
    isAdmin=true
}
 res.json(isAdmin);

 console.log(results)
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