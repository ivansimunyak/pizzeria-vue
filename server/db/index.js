const mysql=require('mysql');

 const db=mysql.createPool({
connectionLimit: 10,
password:'finalwarning',
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

table.userOne=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT user.username,user.name AS user_name,user.email,user.adress,user.phone_number,city.name AS city_name,city.id AS city_id FROM user LEFT JOIN city ON user.city_id=city.id WHERE user.id=?',[id],(err,results)=>{
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
table.getAdmin=(user_type_id,user_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT user_type.name FROM user LEFT JOIN user_type ON user.user_type_id=user_type.id WHERE user.user_type_id='"+user_type_id+"' AND user_type.name='Admin' AND user.id='"+user_id+"'",
       (err,results)=>{
            if(err){
                console.log(err)
                return reject(err);
                
            }else{
                return resolve(results);
            }
        });
    });
};
table.orderProductInformation=(product_id,user_id)=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM orders_product WHERE product_id=? AND order_id IN (SELECT id FROM orders WHERE user_id=? AND adress IS NULL)',[product_id,user_id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.getIncompleteOrder=(user_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT id FROM orders WHERE order_status='Incomplete' AND user_id=? ORDER BY when_made DESC LIMIT 1;",[user_id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.addNewOrder=(user_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("INSERT INTO orders(user_id) VALUES (?);",[user_id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.incrementProductQuantity=(quantity,product_id,user_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE orders_product SET quantity='"+quantity+"' WHERE product_id='"+product_id+"' AND order_id IN (SELECT id FROM orders WHERE user_id='"+user_id+"' AND adress IS NULL);",(err,results)=>{
            if(err){
                console.log("error friend")
                return reject(err);
            }else{
                console.log("im EXECUTED")
                return resolve(results);
            }
        });
    });
};
table.addNewProduct=(order_id,product_id)=>{
    return new Promise((resolve,reject)=>{
        db.query('INSERT INTO orders_product(order_id,product_id,quantity) VALUES (?,?,1);',[order_id,product_id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.insertIncompleteOrder=(user_id)=>{
    return new Promise((resolve,reject)=>{
        db.query('INSERT INTO orders(user_id) VALUES (?);',[user_id],(err,results)=>{
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
table.getCustomerType=()=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT * FROM user_type WHERE name='Customer';",(err,results)=>{
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
        db.query('SELECT orders.name,orders.adress,user.name AS employee_name,orders.id,orders.phone_number,orders.order_status FROM orders INNER JOIN user ON orders.employee_id=user.id',(err,results)=>{
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
table.profileDetails=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT orders.id,orders.order_status,orders.adress,orders.phone_number,user.name FROM orders LEFT JOIN user ON orders.employee_id=user.id WHERE user_id=?",[id],(err,results)=>{
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
table.productJoinCategory=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT product.id,product.name AS product_name,product.size,product.price,product.picture,product_category.name AS category_name FROM product LEFT JOIN product_category ON product_category_id=product_category.id",(err,results)=>{
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
        db.query("SELECT location.id,location.city_id,location.name,city.name AS cityName FROM location INNER JOIN city ON location.city_id=city.id WHERE location.id=?;",[id],(err,results)=>{
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
table.getProducts=()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM product',(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.getLatestOrder=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("",[id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.productOne=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM product WHERE id=?',[id],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.checkLogin=(user_id,password)=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM user WHERE id=? AND password=?;',[user_id,password],(err,results)=>{
            if(err){
                return reject(err);
            }
                return resolve(results[0]);
            
        });
    });
};

table.registerUser=(username,password,email,adress,name,phone_number,user_type_id,city_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("INSERT INTO user VALUES (default,?,?,?,?,?,?,?,?);",[username,password,email,adress,name,phone_number,user_type_id,city_id],(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}
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
table.insertLocation=(name,cityID)=>{
    return new Promise((resolve,reject)=>{
        db.query("INSERT INTO location VALUES (default,'"+cityID+"','"+name+"');",(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}


table.insertPaymentMethod=(name)=>{
    return new Promise((resolve,reject)=>{
        db.query("INSERT INTO payment_method VALUES (default,'"+name+"');",(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

table.insertCity=(name)=>{
    return new Promise((resolve,reject)=>{
        db.query("INSERT INTO city VALUES (default,'"+name+"');",(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}
table.sendMessage=(content,user_id,email)=>{
    return new Promise((resolve,reject)=>{
        db.query('INSERT INTO message VALUES (default,?,?,?);',[content,user_id,email],(err,results)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(results);
            }
        });
    });
};
table.editCity=(name,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE city SET name= ? WHERE id=?;",[name,id],
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
table.editLocation=(name,id,city_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE location SET name= ?,city_id=? WHERE id=?;",[name,city_id,id],
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
table.editUser=(username,email,adress,name,phone_number,city_id,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE user SET username=?,email=?,adress=?,name=?,phone_number=?,city_id=? WHERE id=?;",[username,email,adress,name,phone_number,city_id,id],
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
table.editProduct=(name,size,price,category_id,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE product SET name=?,size=?,price=?,product_category_id=? WHERE id=?;",[name,size,price,category_id,id],
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

table.editPaymentMethod=(name,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE payment_method SET name= ? WHERE id=?;",[name,id],
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
table.editProductWithImage=(name,size,price,category_id,picture_path,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE product SET name=?,size=?,price=?,product_category_id=?,picture=? WHERE id=?;",[name,size,price,category_id,picture_path,id],
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
table.newPassword=(password,id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE user SET password= ? WHERE id=?;",[password,id],
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
table.removeLocation=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM location WHERE id=?",[id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}
table.removeCity=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM city WHERE id=?",[id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}
table.removePaymentMethod=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM payment_method WHERE id=?",[id],(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results);
            }
        })
    })
}
table.removeProduct=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM product WHERE id=?",[id],(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results);
            }
        })
    })
}
table.insertProduct=(name,size,price,category_id,imagePath)=>{
    return new Promise((resolve,reject)=>{
        db.query("INSERT INTO product VALUES (default,'"+name+"','"+size+"','"+price+"','"+category_id+"','"+imagePath+"');",(err,results)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}
table.setOrderDelivered=(id,employee_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE orders SET order_status='Delivered',employee_id=? WHERE id=?;",[employee_id,id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}
table.setOrderProcessing=(id,employee_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE orders SET order_status='Processing',employee_id=? WHERE id=?;",[employee_id,id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}
table.setOrderCanceled=(id,employee_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE orders SET order_status='Canceled',employee_id=? WHERE id=?;",[employee_id,id],(err,results)=>{
            if(err){
                return reject(err)

            }else{
                return resolve(results);
            }
        })
    })
}


module.exports=table;