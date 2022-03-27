<template>
<div class="info-form">
<h1>Checkout{{orderID}}</h1>
      <form @submit.prevent="submitForm">
      <div id="left-form">
      <input type="text" placeholder="Adress" v-model="userAdress" name="adress"><br>
      <input type="text" placeholder="Phone Number" v-model="userPhone" name="phone"><br>
      <input type="text" placeholder="Name" v-model="userName" name="name"><br>
      <select name="location" required v-model="orderLocation"><br>
      <option value="" disabled >Select your location...</option>
      <option v-for="location in locations" :key="location.id" :value="location.id" >{{location.locationName}}</option>
      </select><br>
      <select name="payment_method" required v-model="paymentMethod">
      <option value="" disabled >Select payment method...</option>
      <option v-for="method in paymethods" :key="method.id" :value="method.id" >{{method.name}}</option>
   </select><br>
      </div>
      <div id="right-form">
   <textarea v-model="userComments" placeholder="Enter additional information" name="comments"></textarea>
   </div>
   <btn-styled id="order-btn">Order</btn-styled>
  </form>
</div>
    <section class="productsTable">
    <table>
      <thead>
        <tr class="total">
          <th>Total: {{total}}$</th>
        </tr>
        
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Size</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>
            <img id="product-image" :src="require(`../assets/${product.picture}`)"
            />
          </td>
          <td>{{ product.product_name }}</td>
          <td>{{ product.size }}</td>
          <td>{{ product.category_name }}</td>
          <td>{{product.price}}</td>
          <td>{{product.quantity}}</td>
          <td>{{product.price*product.quantity}}</td>
        </tr>
      </tbody>
    </table>
  </section>
  
</template>
<script>
import axios from 'axios';
export default {
  data(){
    return{
      paymethods:[],
      paymentMethod:'',
      orderLocation:'',
      locations:[],
      userName:'',
      userAdress:'',
      userPhone:'',
      userComments:'',
      orderID:'',
      cartProducts:[]
    }
  },
       computed:{
       products() {
       return this.$store.getters.cart
  },
       total(){
      return this.$store.getters.cartTotal
  },
  user(){
    return this.$store.getters.user
  },accessToken(){
    return this.$store.getters.accessToken
  }
   
}, mounted(){
  this.orderID=this.products[0].order_id;
  axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.accessToken;
    const url='http://localhost:3000/api/paymentMethod/forall';
     axios.get(url,
    ).then((response) =>{
          this.paymethods = response.data;
      } );
      const url1='http://localhost:3000/api/location/forall';
     axios.get(url1,
    ).then((response) =>{
          this.locations = response.data;
      } );
      if(this.$store.getters.user!=null){
         const url2='http://localhost:3000/api/user/'+this.$store.getters.user.user_id;
     axios.get(url2,
    ).then((response) =>{
          this.userAdress=response.data[0].adress;
          this.userPhone=response.data[0].phone_number;
          this.userName=response.data[0].user_name;
      } );
      }
    },
    methods:{
      submitForm(){
        
      if(this.$store.getters.user!=null){
        axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.accessToken;
axios

  .post('http://localhost:3000/api/orders/addincompleteorder',{id:this.$store.getters.user.user_id})
  .then(response => {
    console.log("this is meeee"+response)
    return axios.get('http://localhost:3000/api/orders/getlatestorder/' + this.$store.getters.user.user_id);
  })
  .then(response => {
    console.log("im executed")
    this.orderID=response.data[0].id;
    this.products.forEach(product => {
 product['order_id'] = response.data[0].id;
});
    return axios.post('http://localhost:3000/api/orders/insertorder',{location_id:this.orderLocation,adress:this.userAdress,phone_number:this.userPhone,comments:this.userComments,payment_method_id:this.paymentMethod,name:this.userName,id:this.orderID});
  })
  .then(response => {
for (var i = 0; i < this.products.length; i++) {
        this.cartProducts.push({
            "order_id": this.products[i].order_id,
            "product_id": this.products[i].id,
            "quantity": this.products[i].quantity,
        });
        console.log(response.status)
}
return axios.post('http://localhost:3000/api/orders/insertorderproducts',{array:this.cartProducts});
  }).then(response=>{
    if(response.status==200){
this.$router.push({ path: `/profileorder/${this.orderID}`})
    }
  }
    
    ).catch(error => console.log(error.response));
      }else{
        let guestID=9999
axios
  .post('http://localhost:3000/api/orders/addincompleteorder',{id:guestID})
  .then(response => {
    console.log("this is meeee"+response)
    return axios.get('http://localhost:3000/api/orders/getlatestorder/' + guestID);
  })
  .then(response => {
    console.log("im executed")
    this.orderID=response.data[0].id;
    this.products.forEach(product => {
 product['order_id'] = response.data[0].id;
});
    return axios.post('http://localhost:3000/api/orders/insertorder',{location_id:this.orderLocation,adress:this.userAdress,phone_number:this.userPhone,comments:this.userComments,payment_method_id:this.paymentMethod,name:this.userName,id:this.orderID});
  })
  .then(response => {
for (var i = 0; i < this.products.length; i++) {
        this.cartProducts.push({
            "order_id": this.products[i].order_id,
            "product_id": this.products[i].id,
            "quantity": this.products[i].quantity,
        });
        console.log(response.status)
}
return axios.post('http://localhost:3000/api/orders/insertorderproducts',{array:this.cartProducts});
  }).then(response=>{
    if(response.status==200){
this.$router.push({ path: `/`})
    }
  }
    
    ).catch(error => console.log(error.response));
      
      }
      }
    }
}
</script>
<style scoped>
#order-btn{
    position: relative;
    margin-top: 20%;
    width: 200px;
}
.info-form{
    background-color: #ffffffd9;
    position:relative;
    width:80%;
    height:400px;
    margin: 0px;
    top: 10%;
    margin-left: 10%;
    margin-right: 10%;
    border-style: outset;
    border-color: #a80000;
}
#left-form{
    position: absolute;
    margin-left: 20%;
    
}
#right-form{
    position: absolute;
    margin-left: 50%;
    margin-top: 2%;
    
}
.productsTable {
      border-collapse: collapse;
    table-layout: fixed;
      color: #333;
    margin: 25px 0;
    font-size: 0.9em;
    padding: 0;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
     text-align: center;
       margin-left:auto; 
    margin-right:auto;
      border-color: #a80000;
    width: 85%;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th {
  position: sticky;
  top: 0;
  background: #a80000;
  padding: 10px 5px;
  text-align: center;
  border-bottom: 1px solid #a80000;
  color: white;
  z-index: 3;
  
}
td {
  padding: 5px 5px;
  text-align: center;
  z-index: 1;
  background: white;
}
img {
  width: 125px;
}
input{
  padding:5px;
  margin:5px 0;
  border-radius:10px;
  box-shadow: 5px;
  border-width:1px;
}
select{
  padding:5px;
  margin:5px 0;
  border-radius:10px;
  box-shadow: 5px;
  border-width:1px;
  width: 220px;
}
label{
       font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";

}
textarea{
 position: relative;
  resize: none;
  padding:5px;
  width: 300px;
  height: 125px;
  margin:5px 0;
  border-radius:10px;
  box-shadow: 5px;
  border-width:1px;
}
</style>