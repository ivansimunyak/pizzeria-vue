<template>
    <h1 id="head">Locations</h1>
    <section class="typesTable">
    <table>
        <thead>
            <tr>
                <th>Store</th>
                <th>City</th>
                <th>Edit</th>
                <th>Remove</th>
        
            </tr>
        </thead>
        <tbody>
            <tr v-for="(location, index) in locations" :key="index">
                <td>{{location.locationName}}</td>
                <td>{{location.cityName}}</td>
                <td><btn-styled class="btnEdit" @click="editLocation(location.id,location.locationName,location.cityID,location.cityName,index)">Edit</btn-styled> </td>
                <td><btn-styled class="btnDelete" @click="removeLocation(location.id,index)">Remove</btn-styled> </td>
            </tr>
        </tbody>
    </table>
</section>
<h2 id="editLocation">Edit location</h2>
<div class="edit">
     <form class="form" @submit.prevent="editLocationForm">
         <label for="id">ID:</label><br>
         <input required type="number" isd="editID" name="editID" v-model="editID"><br>
  <label for="editName">Name:</label><br>
  <input required type="text" id="editID" name="editName" v-model="editLocationName"><br>
   <label for="selectCity">City:</label><br>
  <select required id="selectCity" ref="setCity" name="city_name" v-model="editCity">
        <option disabled value="">Choose a city...</option>
   <option v-for="city in cities" :value="city.name" :key="city.id">{{city.name}}</option>
   </select><br><br>
 <btn-styled type="submit">Submit</btn-styled>
</form>
</div>
</template>


<script>
import axios from 'axios';
import BtnStyled from './BtnStyled.vue'
export default {
    components:{
        BtnStyled
    },
    data(){
        return{
            locations:[],
         setCity:'Choose city..',
         editCity:'',
         editCityID:'',
         editLocationName:'',
         editID:'',
         cities:[]
        }
    },
    mounted(){
    const url='http://localhost:3000/api/location/';
     axios.get(url).then((response) =>{
          this.locations = response.data;
      } );

      const url1='http://localhost:3000/api/city/';
     axios.get(url1).then((response) =>{
          this.cities = response.data;
      } );


    },methods:{
       editLocation(id,name,cityID,cityName,index){
            this.editLocationName=name;
            this.editID=id;
            this.editCity=cityName;
            this.editCityID=cityID;
           this.saveIndex=index;
        },
        editLocationForm(){
                   axios.post('http://localhost:3000/api/location/editlocation',
             {name:this.editLocationName,id:this.editID,city_id:this.editCityID}).then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                     this.locations.splice(this.saveIndex,1,{locationName:this.editLocationName,id:this.editID,cityID:this.editCityID,cityName:this.editCity}) ;             
                     
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log( error.response.status)
                 });
                 
        },
        removeLocation(id,index){
               axios.post('http://localhost:3000/api/location/removelocation/'+id)
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data);  
                        this.locations.splice(index, 1);
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
#head{
 position: absolute;
font-family: 'Times New Roman', Times, serif;
font-size: 45px;
width: 30%;
left: 30%;
top: 1%; 
}
.typesTable{
      border: 1px solid #999;
    border-radius: 1px;
    color: #333;
    background: white;
    overflow: auto;
    height: 250px;
    width: 40%;
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
     #editLocation{
    position: absolute;
    top: 55%;
    width: 30%;
    margin-left: 25%;
    left: 25%;
}
.edit{
    position: absolute;
    top: 66%;
    left:50%;
      font-family:"Bookerly";
color: black;
border-style:groove;
width: 30%;
 background-color: rgb(255, 255, 255);
 border-color: #a80000;
}
</style>