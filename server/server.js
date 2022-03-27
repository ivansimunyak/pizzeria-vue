require('dotenv').config({ path: './.env' });
const express=require('express');
const path = require('path')
const userRouter=require('./routes/userRouter');
const userTypeRouter=require('./routes/userTypeRouter');
const cityRouter=require('./routes/cityRouter');
const locationRouter=require('./routes/locationRouter');
const messageRouter=require('./routes/messageRouter');
const ordersProductRouter=require('./routes/ordersProductRouter');
const ordersRouter=require('./routes/ordersRouter');
const paymentMethodRouter=require('./routes/paymentMethodRouter');
const productCategoryRouter=require('./routes/productCategoryRouter');
const productRouter=require('./routes/productRouter');
const app=express();
const bodyParser= require('body-parser');
const cors=require('cors');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/api/user',userRouter);
app.use('/api/userType',userTypeRouter);
app.use('/api/city',cityRouter);
app.use('/api/message',messageRouter);
app.use('/api/location',locationRouter);
app.use('/api/ordersProduct',ordersProductRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/paymentMethod',paymentMethodRouter);
app.use('/api/productCategory',productCategoryRouter);
app.use('/api/products',productRouter);

app.use(express.static(path.join(__dirname, 'assets')))
app.listen('3000', () =>{
    console.log(`Server is running on port: ${process.env.PORT || `3000`} `);
});