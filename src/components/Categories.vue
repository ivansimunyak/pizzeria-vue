<template>
    <div id="wrapper">
<h1 id="categoriesHeader">Categories</h1>

    <table class="table">
    
     <thead>
          <tr>
              <th>{{header}}</th>
             <th>Edit</th>
              <th>Remove</th>
          </tr>
     </thead>
      <tbody>
          <tr v-for="(category, index) in categories" :key="index">
              <td>{{category[column]}}</td>
                 <td><btn-styled class="btnEdit" @click="editCategory(category.id,category.name,index)">Edit</btn-styled></td>
                 <td><btn-styled class="btnDelete" @click="removeCategory(category.id,index)">Remove</btn-styled></td>
          </tr>   
      </tbody>
    </table>
        <h2 id="addNew">Add new category</h2>
    <div class="wrapForm">
     <form class="form" @submit.prevent="submitForm">
  <label for="fname">Name:</label><br>
  <input type="text" ref="inputName" id="name" name="name" required v-model="name"><br>
 <btn-styled type="submit">Submit</btn-styled>
</form>


</div>
<h2 id="editCategory">Edit category</h2>
<div class="edit">
     <form class="form" @submit.prevent="editCategoryForm">
         <label for="id">ID:</label><br>
         <input type="number" id="editID" name="editID" v-model="editID"><br>
  <label for="fname">Name:</label><br>
  <input type="text" id="editID" name="editName" v-model="editName"><br>
 <btn-styled type="submit">Submit</btn-styled>
</form>
</div>
    </div>
    
</template>
<script>
import axios from 'axios'
import BtnStyled from './BtnStyled.vue';
export default {
  components: { BtnStyled },
    data(){
        return{
              categories:[],
            header:'Name',
            column:'name',
            name:'',
            latestRecord:'',
            editName:'',
            editID:'',
            objecttest:[{name:'',id:'',index:''}],
            saveIndex:'',
            idArray:[]
        }
    }, mounted(){
    const url='http://localhost:3000/api/productCategory/';
     axios.get(url).then((response) =>{
          this.categories = response.data;
          this.latestRecord=this.categories.slice(-1);
      } );
    },methods:{
                submitForm(){
            axios.post('http://localhost:3000/api/productCategory/addcategory', {name:this.name})
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                     this.rerunData(this.name);
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log( error.response.status)
                 });
              
        },removeCategory(id,index){
            axios.post('http://localhost:3000/api/productCategory/removecategory/'+id)
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                        this.categories.splice(index, 1);
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log( error.response.status)
                 });
                 
        
        }, editCategoryForm(){
            axios.post('http://localhost:3000/api/productCategory/editcategory', {name:this.editName,id:this.editID})
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                     this.categories.splice(this.saveIndex,1,{name:this.editName}) ;             
                     
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log( error.response.status)
                 });
                 
        },
        editCategory(id,name,index){
            this.editName=name;
            this.editID=id;
        // this.objecttest={name:name,id:id,index:index};
        this.saveIndex=index;
        },
        rerunData(name){
             const url='http://localhost:3000/api/productCategory/';
         axios.get(url).then((response) =>{
          this.idArray=response.data;
          var lastID=this.idArray[this.idArray.length-1].id;
          this.categories.push({name:name,id:lastID})
      } );
        }
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
}
#categoriesHeader{
    position: absolute;
font-family: 'Times New Roman', Times, serif;
font-size: 45px;
width: 30%;
left: 30%;
top: 1%; 
}
.wrapForm{
font-family: 'Times New Roman', Times, serif;
color: blue;
border-style:groove;
width: 30%;
 background-color: rgb(255, 255, 255);
 position:relative;
 left: 50%;
 top: 20%;
}
table {
    border-collapse: collapse;
    table-layout: fixed;
    margin: 25px 0;
    position:relative;
    font-size: 0.9em;
    padding: 0;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
      font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
     text-align: center;
       margin-left:5%; 
    margin-right:auto;
    position:absolute;
    top:20%;
    
}
tbody tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .25em;
    
    
}
tbody td{
     font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
}
thead tr{
     background-color: #a80000;
    color: #ffffff;
    text-align: left;
      font-weight: bold;
}

table th,
table td {
    width: 15px ;
    padding: 12px 15px;
    text-align: center;
    
}

table th {
    
    font-size: 12.5px;
    letter-spacing: .1em;
    
    
}
.form{
   font-family:"Bookerly";
  
}
input[type=text] {
  padding:5px;
  margin:5px 0;
  border-radius:10px;
  box-shadow: 5px;
  border-width:1px;
}
#addNew{
    position: relative;
    left:150px;
    top:20%;
}
.edit{
    position: relative;
    top: 20%;
    left:50%;
    font-family: 'Times New Roman', Times, serif;
color: black;
border-style:groove;
width: 30%;
 background-color: rgb(255, 255, 255);
}
#editCategory{
    position: relative;
    top: 20%;
    width: 30%;
    margin-left: 25%;
    left: 25%;
}
</style>