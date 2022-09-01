const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');
const mysql=require('mysql');

// set connection below
const db1=mysql.createPool({
    connectionLimit: 200,
    password:'root',
    user:'root',
    database:'pizzeriaproject',
    host:'localhost',
    port:'3306'
    });

router.get('/',authenticateEmployeeToken,async(req,res,next)=>{
    db1.query("SELECT * FROM orders ORDER BY when_made ASC",(err,results)=>{
        if (err) {
            return res.status(400).send({
                msg: err
              });
        }
          if(results){
             res.json(results)
          }
    });
});

router.get('/:id',async(req,res,next)=>{
    try{
let results=await db.ordersJoinProducts(req.params.id);
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/sum/:id',async(req,res,next)=>{
    try{
let results=await db.getSumOrder(req.params.id);
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
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
    router.post('/editorder',authenticateEmployeeToken, function (req, res) {
        try{
          
            let results=db.editOrders(req.body.name,req.body.adress,req.body.phone_number,req.body.order_status,req.body.id);
            res.json(results);
            
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
      });

      router.post('/removeorder/:id',authenticateEmployeeToken,async(req,res,next)=>{
        try{
    let results= db.removeOrder(req.params.id);
     res.json(results);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    });
    router.get('/profile/:id',authenticateUserToken,async(req,res,next)=>{
        try{
        if(req.user.user_id!=req.params.id) return res.sendStatus(403)
    let results=await db.profileDetails(req.params.id);
    res.json(results);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    });
    router.post('/addincompleteorder',async(req,res,next)=>{
        try{
    db.insertIncompleteOrder(req.body.id);
    res.sendStatus(200)
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    });
   router.get('/getlatestorder/:id',async(req,res,next)=>{
    db1.query("SELECT id FROM orders WHERE order_status='Processing' AND user_id=? ORDER BY when_made DESC LIMIT 1;",[req.params.id],(err,results)=>{
        if (err) {
            return res.status(400).send({
                msg: err
              });
        }
        if (!results.length) {
            return res.status(401).send({
              msg: 'No such order or user!'
            });
          }
          if(results){
             res.json(results)
          }
    });
   });
   router.post('/insertorder',async(req,res,next)=>{
    db1.query("INSERT INTO orders(location_id,user_id,when_made,order_status,adress,phone_number,comments,payment_method_id,name) VALUES (?,?,current_timestamp(),'Processing',?,?,?,?,?);",[req.body.location_id,req.body.user_id,req.body.adress,req.body.phone_number,req.body.comments,req.body.payment_method_id,req.body.name],(err,results)=>{
        if (err) {
            return res.status(400).send({
                msg: err
              });
        }
        if(results.affectedRows==0){
            return res.status(404).send({
                msg:'There has been an error!'
            })
        }
        if(results.affectedRows>0){
        return res.status(200).send({
            msg: 'Order inserted successfully!'
          });
        }
    });
   });

   router.post("/insertorderproducts",async(req,res,next)=>{
       console.log("BROTHER")
       try{
    const datatoDB = req.body.array;
    
    db1.query(
        "INSERT INTO orders_product VALUES ?", 
        [datatoDB.map(data => [data.order_id, data.product_id, data.quantity])],
        function (error, response) {
            if(response.affectedRows==0){
                return res.status(404).send({
                    msg:'There has been an error!'
                })
            }
            if(response.affectedRows>0){
                return res.status(200).send({
                    msg: 'Order inserted successfully!'
                  });
                }
            if (error) throw error;
            console.log(response);
         }
    )
       }catch(e){
           console.log(e)
       }
   });
   router.post('/setorderdelivered',authenticateEmployeeToken,async(req,res,next)=>{
    try{
let results= db.setOrderDelivered(req.body.id,req.body.user_id);
 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/setorderprocessing',authenticateEmployeeToken,async(req,res,next)=>{
    try{
let results= db.setOrderProcessing(req.body.id,req.body.user_id);

 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/setordercanceled',authenticateEmployeeToken,async(req,res,next)=>{
    try{
let results= db.setOrderCanceled(req.body.id,req.body.user_id);
console.log(results)
 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
function authenticateUserToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(" ")[1]
    if(token==null) return res.sendStatus(403)
    jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN,(err,user)=>{
        if(err) {
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
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
        }else{
        req.user=user
        next()
        }
    })
}
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