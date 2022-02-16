require('dotenv').config({ path: './.env' });
const express=require('express');
const router=express.Router();
const db=require('../db');
const jwt=require('jsonwebtoken');
const mysql=require('mysql');

const db1=mysql.createPool({
connectionLimit: 10,
password:'finalwarning',
user:'root',
database:'pizzeriaproject',
host:'localhost',
port:'3306'
});

router.get('/',async(req,res,next)=>{
    try{
let results=await db.userAll();
res.json(results);


    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.delete('/logout',(req,res)=>{
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
})
router.post('/token',async(req,res)=>{
    if(req.headers.cookie==null) return res.sendStatus(403)
    const refreshToken=req.headers.cookie.split("=")[1];
    if(refreshToken==null) return res.sendStatus(401)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
        res.json({accessToken:accessToken})
    })
});


router.get('/:id',async(req,res,next)=>{
    try{
let results=await db.userOne(req.params.id);
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/register',async(req,res,next)=>{
    console.log("register user "+req.body.username);
    try{
let results= db.registerUser(req.body.username,req.body.password,req.body.email,req.body.adress,req.body.name,req.body.phone_number,req.body.user_type_id,req.body.city_id);
 res.json(results);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/login',async(req,res,next)=>{
    db1.query('SELECT * FROM user WHERE username=? AND password=?;',[req.body.username,req.body.password],(err,results)=>{
        if (err) {
            return res.status(400).send({
                msg: err
              });
        }
        if (!results.length) {
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          if(results){
              const user={username:results[0].username,user_id:results[0].id}
              const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
            const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
      });
          return res.status(200).send({
            msg: 'Logged in!',
            accessToken,
            user: results[0]
          });
        }
    });




    // const username=req.body.username;
    // const user={username:username}
    // let results= db.checkLogin(req.body.username,req.body.password);
   
   
    
});
module.exports=router;