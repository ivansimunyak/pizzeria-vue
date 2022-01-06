<template>
<div id="wrapper">
    <products :key="this.uniqueProductKey"></products>
         <h2 id="addNew">Add new product{{formdata}}</h2>
    <div class="addProductForm">
     <form class="form" @submit.prevent="submitForm">
  <label for="fname">Name:</label><br>
  <input type="text" ref="inputName" id="name" name="name" required v-model="addingName"><br>
  <label for="product_size">Size:</label><br>
  <select class="selectForm" ref="productSize" name="product_size" v-model="addingSize">
       <option disabled value="">Select size...</option>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
   </select><br><br>
     <label for="price">Price:</label><br>
  <input type="number" ref="inputPrice" id="price" name="price" required v-model="addingPrice"><br>
    <label for="category">Category:</label><br>
    <select required class="selectForm" ref="inputCategory" name="category" v-model="addingCategoryID">
      <option disabled value="">Select a category...</option>
            <option v-for="category in categories" :key="category.id" :value="category.id" >{{category.name}}</option>
   </select><br><br>
   <label for="image">Image:</label><br>
   <input type="file" ref="file" id="files" name="image" @change="handleFileUpload">
   <br>
 <btn-styled type="submit">Submit</btn-styled>
</form>
</div>
 </div>
 
</template>
<script>
import BtnStyled from "../components/BtnStyled.vue"
import axios from 'axios'
export default {
    components:{
        BtnStyled,
        
    },data(){
        return{
            uniqueCatKey:0,
            addingName:'',
            addingPrice:'',
            addingSize:'',
            addingCategoryID:'',
            addingImage:null,
            categories:[]

        }
    },
    methods:{
        submitForm(){
            const fd=new FormData();
            fd.append('name',this.addingName);
            fd.append('size',this.addingSize);
            fd.append('price',this.addingPrice);
            fd.append('category_id',this.addingCategoryID);
            fd.append('productImage',this.addingImage);
            axios.post('http://localhost:3000/api/products/addproduct',fd)
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                    this.uniqueCatKey++;
                    this.addingName='';
                
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log( error.response.status)
                 });
                
        },
        handleFileUpload(event){
            this.addingImage=event.target.files[0]
           
        }
    },
    mounted(){
           const url='http://localhost:3000/api/productCategory/';
     axios.get(url).then((response) =>{
          this.categories = response.data;
      } );
    }
    
}
</script>
<style scoped>
#wrapper{
   background-color: #ffffffd9;
    position:absolute;
    width:80%;
    height:100%;
    margin: 0px;
    top: 10%;
    margin-left: 10%;
    margin-right: 10%;
    border-style: outset;
    border-color: #a80000;
}

.addCategoryForm{
font-family:"Bookerly";
color: black;
border-style:groove;
width: 30%;
 background-color: rgb(255, 255, 255);
 position:absolute;
 left: 50%;
 top: 30%;
 border-color: #a80000;
}
#addNew{
    position: absolute;
    left: 55%;
    top:19%;
}
input[type=text] {
  padding:5px;
  margin:5px 0;
  border-radius:10px;
  box-shadow: 5px;
  border-width:1px;
}
</style>