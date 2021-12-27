const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/',async(req,res,next)=>{
    try{
let results=await db.message();
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/removemessage/:id',async(req,res,next)=>{
    try{
let results= db.removeMessage(req.params.id);
 res.json(results);
console.log("remove msg");
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports=router;