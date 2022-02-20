const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');

router.get('/',authenticateToken,async(req,res,next)=>{
    try{
let results=await db.ordersAll();
console.log("All orders are happening");

res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id',async(req,res,next)=>{
    try{
let results=await db.ordersJoinProducts(req.params.id);
console.log("orders join is happening");
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/sum/:id',async(req,res,next)=>{
    try{
let results=await db.getSumOrder(req.params.id);
console.log("ITS SUM");
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/details/:id',async(req,res,next)=>{
    try{
let results=await db.ordersForDetails(req.params.id);
res.json(results);
console.log("Order for details is happening");
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
    router.post('/editorder',authenticateToken, function (req, res) {
        console.log("Insert "+req.body.name);
        try{
          
            let results=db.editOrders(req.body.name,req.body.adress,req.body.phone_number,req.body.order_status,req.body.id);
            res.json(results);
            
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
      });

      router.post('/removeorder/:id',authenticateToken,async(req,res,next)=>{
        try{
    let results= db.removeOrder(req.params.id);
     res.json(results);
    console.log("remove happening");
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