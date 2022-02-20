const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');

router.get('/',authenticateToken,async(req,res,next)=>{
    try{
let results=await db.location();
console.log('this is happening')
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/:id',async(req,res,next)=>{
    try{
        console.log(req.params.id)
let results=await db.locationOne(req.params.id);
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/addlocation',authenticateToken,async(req,res,next)=>{
    console.log("insert location "+req.body.name);
    try{
let results= db.insertLocation(req.body.name,req.body.city_id);
 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editlocation',authenticateToken,async(req,res,next)=>{
    console.log("edit location "+req.body.name);
    try{
let results= db.editLocation(req.body.name,req.body.id,req.body.city_id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removelocation/:id',authenticateToken,async(req,res,next)=>{
    console.log("remove location "+req.params.id);
    try{
let results= db.removeLocation(req.params.id);
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