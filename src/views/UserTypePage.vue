<template>
<div id="wrapper">
   <h1 id="head">User Types</h1>
       <user-types :key="this.uniqueTypeKey"/>
         <h2 id="addNew">Add new type</h2>
    <div class="addType">
     <form class="form" @submit.prevent="submitForm">
  <label for="fname">Name:</label><br>
  <input type="text" ref="inputName" id="name" name="name" required v-model="addingName"><br>
 <btn-styled type="submit">Submit</btn-styled>
</form>
</div>
</div>
 
</template>
<script>
import axios from 'axios'
import BtnStyled from '../components/BtnStyled.vue'
import UserTypes from '../components/UserTypes.vue'
export default {
  components: { BtnStyled,UserTypes },
  data(){
    return{
      addingName:'',
      uniqueTypeKey:0
    }
  },
    methods:{
          submitForm(){
            axios.post('http://localhost:3000/api/userType/addtype', {name:this.addingName})
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                    this.uniqueTypeKey++;
                    this.addingName='';
                
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log( error.response.status)
                 });
                
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
    border-color: #a80000;
}
#head{
 position: absolute;
font-family: 'Times New Roman', Times, serif;
font-size: 45px;
width: 30%;
left: 30%;
top: 1%; 
}
.addType{
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
  border-color: #a80000;
}
</style>