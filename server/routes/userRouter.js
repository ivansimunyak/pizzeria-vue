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
console.log("this is whats executed");
res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.delete('/logout',(req,res)=>{
    // res.clearCookie('refreshToken');
    return res.sendStatus(200);
})
// router.post('/token',async(req,res)=>{
//     if(req.headers.cookie==null) return res.sendStatus(403)
//     const refreshToken=req.headers.cookie.split("=")[1];
//     if(refreshToken==null) return res.sendStatus(401)
//     console.log("refresh token here"+refreshToken)
//     jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
//         if(err) return res.sendStatus(403)
//         const accessToken= jwt.sign(user,process.env.ADMIN_ACCESS_TOKEN,{expiresIn:(Date.now())})
//         res.json({accessToken:accessToken})
        
//     })
// });


router.get('/oneuser/:id',authenticateUserToken,async(req,res,next)=>{
    try{
    let results=await db.userOne(req.params.id);
console.log("this is me"+ req.query.id+"params"+req.params.id)
    res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
// let results= db.registerUser(req.body.username,req.body.password,req.body.email,req.body.adress,req.body.name,req.body.phone_number,req.body.user_type_id,req.body.city_id);
router.post('/register',async(req,res,next)=>{
    console.log(req.body.username+"hiyyy")
    db1.query('SELECT * FROM user WHERE username=? OR email=?',[req.body.username,req.body.email],(err,results)=>{
        if (err) {
            console.log("response 400 sent")
            return res.status(400).send({
                msg: err
              });
        }
        if(!results.length){
            console.log("EXECUTED")
             db.registerUser(req.body.username,req.body.password,req.body.email,req.body.adress,req.body.name,req.body.phone_number,req.body.user_type_id,req.body.city_id);
             return res.status(200).send({
                msg: 'Register success!'
              });
        }
        if(results){
            console.log("response 401 sent")
            return res.status(200).send({
                msg: 'Username or email taken!'
            });
        }
    }) 
});
router.post('/login',async(req,res,next)=>{
    db1.query('SELECT username,user.id,user_type.name AS userType,user_type_id,email FROM user LEFT JOIN user_type ON user.user_type_id=user_type.id  WHERE username=? AND password=?;',[req.body.username,req.body.password],(err,results)=>{
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
              const user={username:results[0].username,user_id:results[0].id,user_type:results[0].userType,user_type_id:results[0].user_type_id,email:results[0].email}
            //   const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
              let accessToken=null;
              let isAdmin=false;
              let isEmployee=false;
            if(user.user_type=='Admin'){
                isAdmin=true;
                 accessToken= jwt.sign(user,process.env.ADMIN_ACCESS_TOKEN,{expiresIn:'12h'})
                 console.log("accessed admin jwt")
            }else if(user.user_type=='Employee'){
                isEmployee=true;
                accessToken= jwt.sign(user,process.env.EMPLOYEE_ACCESS_TOKEN,{expiresIn:'12h'})
            }
            else{
                 accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
                 console.log("accessed user jwt")
            }
    //         res.cookie("refreshToken", refreshToken, {
    //             httpOnly: true,
    //             sameSite: "strict",
    //   });
          return res.status(200).send({
            msg: 'Logged in!',
            accessToken,
            user: user,
            isAdmin: isAdmin,
            isEmployee:isEmployee,
          });
          
        }
    });   
});
router.post('/updateusertype',async(req,res,next)=>{
    try{
let results= db.updateUserType(req.body.user_id,req.body.user_type_id);
 res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/deleteuser',authenticateToken,async(req,res,next)=>{
    console.log(req.body.id+"hiyyy")
            db1.query('DELETE FROM user WHERE id=?',[req.body.id],(err,results)=>{
                if (err) {
                    return res.status(400).send({
                        msg: err
                      });
                }
                if(results.affectedRows>0) return res.sendStatus(200)
            }) 
});
// let results= db.editUser(req.body.username,req.body.email,req.body.adress,req.body.name,req.body.phone_number,req.body.city_id,req.body.id);
router.post('/editprofile',authenticateUserToken,async(req,res,next)=>{
    console.log(req.user.email)
    console.log(req.body.email+"hiyyy")
    if(req.user.email!=req.body.email){
        console.log("done")
    db1.query('SELECT * FROM user WHERE email=?',[req.body.email],(err,results)=>{
        if (err) {
            console.log("response 400 sent")
            return res.status(400).send({
                msg: err
              });
        }
        if(!results.length){
            console.log("EXECUTED")
            db.editUser(req.body.email,req.body.adress,req.body.name,req.body.phone_number,req.body.city_id,req.body.id);
             return res.status(200).send({
                msg: 'Edited profile successfully!'
              });
        }
        if(results){
            console.log("response 401 sent")
            return res.status(200).send({
                msg: 'Username or email taken!'
            });
        }
    }) 
}else{
    console.log('heyyyegasdgsdga')
    try{
        
        db.editUser(req.body.email,req.body.adress,req.body.name,req.body.phone_number,req.body.city_id,req.body.id);
        res.status(200).send({msg:"Edited profile successfully!"})
    }catch(e){
        console.log(e)
    }
}
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

router.post('/changepassword',async(req,res,next)=>{
    db1.query('SELECT * FROM user WHERE password=? AND id=?;',[req.body.password,req.body.id],(err,results)=>{
        if (err) {
            return res.status(400).send({
                msg: err
              });
        }
        if (!results.length) {
            return res.status(401).send({
              msg: 'Password is incorrect!'
            });
          }
          if(results){
             let passwordResults= db.newPassword(req.body.newPassword,req.body.id);
             if(passwordResults) return res.sendStatus(200)
             else return res.sendStatus(404)
          }
    });
})
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
                        console.log("this is me"+user)
                        next()
                    })
                }else{
                req.user=user
                console.log("this is me"+user)
                next()
                }
            })
        }else{
        req.user=user
        next()
        }
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