const mysql=require('mysql');

 const db=mysql.createPool({
connectionLimit: 10,
password:'root',
user:'root',
database:'pizzeriaproject',
host:'localhost',
port:'3306'
});

let table={};

table.userAll=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM user',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.userOne=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM user WHERE id=?',[id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.userType=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM user_type',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.insertType=(name)=>{
    return new Promise((resolve,reject)=>{
        db.query("INSERT INTO user_type VALUES (default,'"+name+"');",(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}
table.productCategory=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM product_category',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.insertCategory=(name)=>{
    return new Promise((resolve,reject)=>{
        db.query("INSERT INTO product_category VALUES (default,'"+name+"');",(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}
table.paymentMethod=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM payment_method',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.paymentMethodOne=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT * FROM payment_method WHERE id=?;",[id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    }); 
};
table.ordersProduct=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM orders_product',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.ordersAll=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM orders',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};

table.ordersJoinProducts=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT product.id,product.name,product.size,product.price,product.product_category_id,"
        +"orders_product.order_id,orders_product.product_id,orders_product.quantity FROM product INNER JOIN orders_product "
        +"ON product.id=orders_product.product_id AND orders_product.order_id=?;",[id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    }); 
};
table.ordersForDetails=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT * FROM orders WHERE id=?;",[id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    }); 
};
table.getSumOrder=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT sum(price*quantity) AS "+"sum"+
       " FROM product INNER JOIN orders_product ON product.id=orders_product.product_id"+
        " AND orders_product.order_id=?;",[id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    }); 
};
table.message=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT message.id,content,name,message.email FROM message LEFT JOIN user on message.user_id=user.id',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.location=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT location.id,location.name AS locationName,city.id AS cityID,city.name AS cityName  FROM location INNER JOIN city ON location.city_id=city.id;',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.locationOne=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT * FROM location FULL JOIN city ON location.city_id=city.id WHERE location.id=?;",[id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    }); 
};
table.city=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM city',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.editOrders=(name,adress,phone_number,order_status,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE orders SET name=?, adress=?, phone_number=?, order_status=? WHERE id=?",[name,adress,phone_number,order_status,id],
        (err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        }
        
        )
    })
};
table.editCategory=(name,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE product_category SET name= ? WHERE id=?;",[name,id],
        (err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        }
        
        )
    })
};
table.editType=(name,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE user_type SET name= ? WHERE id=?;",[name,id],
        (err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        }
        
        )
    })
};
table.removeType=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM user_type WHERE id=?",[id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}
table.removeOrder=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM orders WHERE id=?",[id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}
table.removeMessage=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM message WHERE id=?",[id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}
table.removeCategory=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM product_category WHERE id=?",[id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}
module.exports=table;