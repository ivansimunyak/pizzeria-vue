const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/',async(req,res,next)=>{
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
router.post('/addlocation',async(req,res,next)=>{
    console.log("insert location "+req.body.name);
    try{
let results= db.insertLocation(req.body.name,req.body.city_id);
 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/editlocation',async(req,res,next)=>{
    console.log("edit location "+req.body.name);
    try{
let results= db.editLocation(req.body.name,req.body.id,req.body.city_id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removelocation/:id',async(req,res,next)=>{
    console.log("remove location "+req.params.id);
    try{
let results= db.removeLocation(req.params.id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports=router;