<template>
<div id="wrapper">
<div id="header">
    <h1>Order Details</h1>
    <h2>Order ID {{orderID}}</h2>
</div> 
<btn-styled class="btnDelete" @click="removeOrder">Delete Order</btn-styled>
<btn-styled class="btnEdit" @click="$router.push({ path: `/editorder/${orderID}/${this.adress}/${this.name}/${this.phone_number}/${this.orderStatus}`})">Edit Order</btn-styled>
<btn-styled class="btnBack" @click="$router.push({ path: `/orders`})">Back to orders</btn-styled>
<div class="left-list">
    <ul v-for="item in orderDetails" :key="item.id">
     <li>Name: {{item.name}}</li>
     <li>Phone Number: {{item.phone_number}}</li>
     <li>Store: {{locationName}}</li>
     <li>Adress: {{item.adress}}</li>
     <li>Payment Method: {{paymentMethodName}}</li>
    </ul>
</div>
<div class="right-list">
     <ul v-for="item in orderDetails" :key="item.id">
     <li>When Made: {{this.format_date(this.whenMade)}}</li>
     <li>Order Status: {{item.order_status}}</li>
     <li>Employee:{{employeeName}} </li>
     <li>Comments: {{item.comments}} </li>
     
    </ul>
</div>
<div class="wrap-table">
<table-orders id="table" :columns="this.columns" :headers="this.headers" :items="orderProducts" :columnsX="this.columnsX"></table-orders>
</div>
</div>
</template>

<script>

import TableOrders from './TableOrders.vue';
import axios from 'axios';
import BtnStyled from './BtnStyled.vue';
import moment from 'moment';
export default {
    props:{orderID:Number},
    components:{TableOrders,BtnStyled},
    data(){
        return{
           columns:['name','size','quantity','price'],
           headers:['Product Name','Product Size','Quantity','Price'],
           columnsX:['quantity','price'],
           orderProducts:[],
           orderDetails:[],
           sum:0,
           paymentMethodID:'',
           paymentMethodName:'',
           locationID:'',
           locationName:'',
           employeeID:'',
           employeeName:'',
           whenMade:0,
           adress:'',
           name:'',
           phone_number:'',
           orderStatus:''
        }
    },
     computed: {
    accessToken() {
    return this.$store.getters.accessToken
  },
  },
    mounted(){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.accessToken;
        const url='http://localhost:3000/api/orders/'+this.orderID;
     axios.get(url,{headers: {
      'Authorization': 'Bearer ' + this.accessToken}
    }).then((response) =>{
          this.orderProducts = response.data;
      } );
     const url1='http://localhost:3000/api/orders/details/'+this.orderID;
       axios.get(url1,{headers: {
      'Authorization': 'Bearer ' + this.accessToken}
    }).then((response) =>{
          this.orderDetails=response.data;
          this.paymentMethodID=response.data[0].payment_method_id;
          this.locationID=response.data[0].location_id;
          this.employeeID=response.data[0].employee_id;
          this.whenMade=new Date(response.data[0].when_made);
          this.adress=response.data[0].adress;
          this.name=response.data[0].name;
          this.phone_number=response.data[0].phone_number;
          this.orderStatus=response.data[0].order_status;
          
      } );
     const url2='http://localhost:3000/api/orders/sum/'+this.orderID;
        axios.get(url2,{headers: {
      'Authorization': 'Bearer ' + this.accessToken}
    }).then((response) =>{
          this.sum=response.data[0].sum;
      } );
      const url3="http://localhost:3000/api/paymentMethod/"+this.paymentMethodID;
        axios.get(url3,{headers: {
      'Authorization': 'Bearer ' + this.accessToken}
    }).then((response) =>{
          this.paymentMethodName=response.data[0].name;
      } );
            const url4="http://localhost:3000/api/location/"+this.locationID;
        axios.get(url4,{headers: {
      'Authorization': 'Bearer ' + this.accessToken}
    }).then((response) =>{
          this.locationName=response.data[0].name;
      } );
                  const url5="http://localhost:3000/api/employee/"+this.employeeID;
        axios.get(url5,{headers: {
      'Authorization': 'Bearer ' + this.accessToken}
    }).then((response) =>{
          this.employeeName=response.data[0].name;
      } );
      this.format_date(this.whenMade);
    },
    methods:{
         format_date(value){
         if (value) {
           return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a');
          }
    },
     removeOrder(){
            axios.post('http://localhost:3000/api/orders/removeorder/'+this.orderID)
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                     this.$router.push({
                         name:'OrderPage',
                         params:{removeSuccess:true}
                     });
                  
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log( error.response.status)
                 });
                 this.resetData();
        },
    },
}

</script>
<style scoped>
#header{
position: absolute;
font-family: 'Times New Roman', Times, serif;
color: black;
border-style: double;
width: 30%;
left: 1%;
top: 1%;
 background-color: rgb(255, 255, 255);
}
.btnBack{
    position: absolute;
    left: 6%;
    top: 25%;
    width:20%;
    
}
.btnEdit{
    position: absolute;
    left: 55%;
    top: 5%;
    width:30%;
    height: 7.5%;
}
.btnDelete{
    position: absolute;
    left: 55%;
    top: 15%;
    width:30%;
    height: 7.5%;
}
#wrapper{
   background-color: rgba(255, 255, 255,0.85);
    position:absolute;
    width:93%;
    height:100%;
    top: 10%;
    left: 3.25%;
    border-style: outset;
     /* filter: blur(1px); */
    
}
.wrap-table{
    position: absolute;
    top: 65%;
    left: -1%;
    
}
#table{
    width: 76%;
      border-style: outset ;
       /* border-top-style:    ; */
    border-color:#a80000;
}

.left-list ul{
    top:35%;
    left: 11%;
    position: absolute;
    list-style-type: none;
    background-color: white;
    font-size: 20px;
    width: 30%;
     border-style: ridge ;
    border-color:#a80000;
}
.right-list ul{
    top:35%;
    right: 12%;
    position: absolute;
    list-style-type: none;
    background-color: white;
    font-size: 20px;
     width: 30%;
     border-style: ridge ;
    border-color:#a80000;
}
</style>