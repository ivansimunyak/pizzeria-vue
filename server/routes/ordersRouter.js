const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/',async(req,res,next)=>{
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
    router.post('/editorder', function (req, res) {
        console.log("Insert "+req.body.name);
        try{
          
            let results=db.editOrders(req.body.name,req.body.adress,req.body.phone_number,req.body.order_status,req.body.id);
            res.json(results);
            
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
      });

      router.post('/removeorder/:id',async(req,res,next)=>{
        try{
    let results= db.removeOrder(req.params.id);
     res.json(results);
    console.log("remove happening");
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    });
module.exports=router;