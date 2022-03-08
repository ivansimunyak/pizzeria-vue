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

router.get('/',authenticateToken,async(req,res,next)=>{
    try{
let results=await db.userAll();
console.log(req.headers.cookie);
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


router.get('/:id',authenticateUserToken,async(req,res,next)=>{
    try{
    
let results=await db.userOne(req.params.id);
console.log("this is me"+req.user.user_id)
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
    db1.query('SELECT username,user.id,user_type.name AS userType,user_type_id FROM user LEFT JOIN user_type ON user.user_type_id=user_type.id  WHERE username=? AND password=?;',[req.body.username,req.body.password],(err,results)=>{
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
              const user={username:results[0].username,user_id:results[0].id,user_type:results[0].userType,user_type_id:results[0].user_type_id}
              const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
              let accessToken=null;
              let isAdmin=false;
            if(user.user_type=='Admin'){
                isAdmin=true;
                 accessToken= jwt.sign(user,process.env.ADMIN_ACCESS_TOKEN,{expiresIn:'1h'})
                 console.log("accessed admin jwt")
            }else{
                 accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
                 console.log("accessed user jwt")
            }
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
      });
          return res.status(200).send({
            msg: 'Logged in!',
            accessToken,
            user: user,
            isAdmin: isAdmin
          });
          
        }
    });   
});
router.post('/deleteprofile',authenticateUserToken,async(req,res,next)=>{
    db1.query('SELECT * FROM user WHERE id=? AND password=?;',[req.body.id,req.body.password],(err,results)=>{
        if(err) return res.sendStatus(400)
        if (!results.length) {
            return res.status(401).send({
              msg: 'id or password is incorrect!'
            });
          }
          if(results){
            //   let results=db.userOne(req.body.id);
            //  res.json(results)
            // console.log(req.body.id)
            db1.query('DELETE FROM user WHERE id=?',[req.body.id],(err,results)=>{
                if (err) {
                    return res.status(400).send({
                        msg: err
                      });
                }
                if(results) return res.sendStatus(200)
            })
             
          }
        }); 
    
});
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(" ")[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        console.log("this is me"+user)
        next()
    })
}
function authenticateUserToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(" ")[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN,(err,user)=>{
        if(err) {
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                if(err) return res.sendStatus(403)
                req.user=user
                console.log("this is me"+user)
                next()
            })
        }else{
        req.user=user
        
        next()
        }
    })
  
}

module.exports=router;