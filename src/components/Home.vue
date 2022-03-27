<template>
<h1><btn-styled @click="testingMethod">Click me</btn-styled></h1>
<h1>access token: {{accessToken}}</h1>
    <div @click="closeDialog" v-if="addedProduct"></div>
    <dialog v-if="addedProduct" open>
        <header>
            <slot name="header">
                <h2>Added to cart</h2>
            </slot>
        </header>
        <section>
            Sucessfully added to cart!<br><br>
            <btn-styled @click="closeDialog">Okay</btn-styled>
        </section>
    </dialog>
<section class="productsTable">
    <table>
      <thead>
        
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Size</th>
          <th>Category</th>
          <th>Price</th>
          <th>Add to cart</th>
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
          <td><btn-styled class="btnDelete" @click="addToCart(product)">Add to cart</btn-styled></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import axios from "axios";
import {mapMutations} from 'vuex'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            products:[],
            addedProduct:false,
        }
    },
    mounted(){
            const url = "http://localhost:3000/api/products/productjoincategory";
    axios.get(url).then((response) => {
      this.products = response.data;
    });
    },
    methods:{
      ...mapMutations(["addProduct"]),
      addToCart(product){
        console.log('clicked'+product);
        this.addProduct(product);
        this.addedProduct=true;
      },
      closeDialog(){
        console.log("im executed")
        this.addedProduct=false;
      },
      testingMethod(){
        this.$store.dispatch("REFRESH_TOKEN")
      }
    },computed: {
    ...mapGetters(['accessToken'])
}
}
</script>
<style scoped>
div{
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.75); */
  z-index: 10;
}
dialog {
  position: fixed;
  top: 10vh;
  left: 45%;
  width: 80%;
  z-index: 100;
  border-radius: 6px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

header {
  background-color: #a80000;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    height: 10rem;
    width: 15rem;
  }
}
.productsTable {
      border-collapse: collapse;
    table-layout: fixed;
      color: #333;
    margin: 25px 0;
    background: white;
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
}
img {
  width: 125px;
}
</style>