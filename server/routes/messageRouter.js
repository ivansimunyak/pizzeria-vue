const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');

router.get('/',authenticateToken,async(req,res,next)=>{
    try{
let results=await db.message();
console.log("working")
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/sendmessage',async(req,res,next)=>{
    console.log("message sent "+req.body.user_id);
    try{
let results= db.sendMessage(req.body.content,req.body.user_id,req.body.email);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removemessage/:id',authenticateToken,async(req,res,next)=>{
    try{
let results= db.removeMessage(req.params.id);
 res.json(results);
console.log("remove msg");
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