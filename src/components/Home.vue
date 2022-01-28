<template>
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
          <td><btn-styled class="btnDelete" @click="addToCart">Add to cart</btn-styled></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import axios from "axios";
import BtnStyled from "../components/BtnStyled.vue"
export default {
    components:{BtnStyled},
    data(){
        return{
            products:[]
        }
    },
    mounted(){
            const url = "http://localhost:3000/api/products/productjoincategory";
    axios.get(url).then((response) => {
      this.products = response.data;
    });
    }
}
</script>
<style scoped>
.productsTable {
  /* border: 1px solid #999;
  border-radius: 1px;
  overflow: auto;
  height: 50%;
  width: 85%;
  top: 15%;
  margin-left: 2.5%;
 */
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