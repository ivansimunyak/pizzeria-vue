<template>
<section class="productsTable">
    <table>
    
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in products" :key="index">
                <td><img id="product-image" :src="require(`../assets/${product.picture}`)"></td>
                <td>{{product.name}}</td>
                <td>{{product.size}}</td>
                <td>{{product.price}}</td>
                <td><btn-styled class="btnEdit" >Edit</btn-styled> </td>
                <td><btn-styled class="btnDelete">Remove</btn-styled> </td>
            </tr>
        </tbody>
    </table>
</section>
</template>
<script>
import axios from 'axios';
import BtnStyled from '../components/BtnStyled.vue'
export default {
    components:{BtnStyled},
    data(){
        return{
    products:[],

}
    }, mounted(){
    const url='http://localhost:3000/api/products/';
     axios.get(url).then((response) =>{
          this.products = response.data;
      } );
    },
    methods:{
        removeProduct(id,index){
            axios.post('http://localhost:3000/api/userType/removetype/'+id)
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                        this.types.splice(index, 1);
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log( error.response.status)
                 });
        },getPhoto(){
            return '@/assets/';
        }
    }
}
</script>


<style scoped>
.productsTable{
      border: 1px solid #999;
    border-radius: 1px;
    color: #333;
    background: white;
    overflow: auto;
    height: 250px;
    width: 45%;
    position: relative;
    top:30%;
    margin-left: 2.5%;
    border-color: #a80000;
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
        img{
            width: 55px;
        }
</style>