<template>
    <div id="wrapper">
      <base-dialog  v-if="deleteUser" title="Delete Your Profile" @close="closeDialog">
      <template #default>
        <form @submit.prevent="submitData">
        <label id="enter-password" for="password">Please enter your password</label><br>
        <input type="password" name="password" v-model="password"><br>
        <btn-styled type=submit>Submit</btn-styled>
        </form>
      </template>
      </base-dialog>
        <h1>Your Profile {{password}}</h1>
   <div class="profile-list">
      <ul v-for="(local,index) in localUser" :key="index" >
        <li>Username: {{localUser[index].username}}</li>
        <br />
        <li>Name:{{localUser[index].user_name}}</li>
        <br/>
        <li>Email:{{localUser[index].email}}</li>
        <br />
        <li>Adress:{{localUser[index].adress}}</li>
        <br />
        <li>Phone Number: {{localUser[index].phone_number}}</li>
        <br />
        <li>City: {{localUser[index].city_name}} </li>
      </ul>
    </div>
    <div v-if="profileOrders.length>0" class="wrap-table">
      <table class="table">
     <thead>
          <tr>
              <th v-for="(header, index) in headers" :key="index">{{header}}</th>
          </tr>
         
     </thead>
      <tbody>
          <tr v-for="(profileOrder, index) in profileOrders" :key="index">
              <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{profileOrder[column]}}</td>
              <td><btn-styled @click="$router.push({ path: `/profileorder/${profileOrder.id}`})">Check Details</btn-styled></td>
          </tr>
      </tbody>
    </table>
    </div>
    <btn-styled id="edit-profile" >Edit Profile</btn-styled>
    <btn-styled id="delete-profile" @click="deleteProfile">Delete Profile</btn-styled>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BtnStyled from '../components/BtnStyled.vue'
import axios from 'axios'
export default {
  components:{
    BtnStyled
  },
  data(){
    return{
      columns:["id","order_status","adress","phone_number","name"],
      headers:["Order ID","Order Status","Adress","Phone","Employee","Check Details"],
      profileOrders:[],
      localUser:[],
      deleteUser:false,
      password:''
    }
  },  computed: {
    accessToken() {
      return this.$store.getters.accessToken;
    },
    ...mapGetters(['user'])
  },
  mounted(){
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.accessToken;
    const url = "http://localhost:3000/api/orders/profile/" + this.user.user_id;
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + this.accessToken,
        },
      })
      .then((response) => {
        this.profileOrders = response.data;
      });
      const url1 = "http://localhost:3000/api/user/" + this.user.user_id;
    axios
      .get(url1, {
        headers: {
          Authorization: "Bearer " + this.accessToken,
        },
      })
      .then((response) => {
        response.status
        this.localUser = response.data;
      });
  },
  methods:{
    deleteProfile(){
      this.deleteUser=true;
    },
    submitData(){   
      axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.accessToken;
                  axios.post('http://localhost:3000/api/user/deleteprofile',{id:this.user.user_id,password:this.password})
                 .then((res) => {
                     //Perform Success Action
                     console.log(res.data); 
                    
                      this.$router.push("/logout");
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                    //  console.log( error.response.status)
                    console.log(error)
                 });

      },
    closeDialog(){
      this.deleteUser=false;
    }
  }
}
</script>

<style scoped>
#wrapper{
   background-color: #ffffffd9;
    position:absolute;
    width:80%;
    height:110%;
    margin: 0px;
    top: 10%;
    margin-left: 10%;
    margin-right: 10%;
    border-style: outset;
    border-color: #a80000;
}
.profile-list {
  top: 20%;
  left: 10%;
  position: absolute;
  background-color: white;
  width: 40%;
  border-style: ridge;
  border-color: #a80000;
  height: 30%;
   padding:5px;
  margin:5px 0;
  border-radius:15px;
  box-shadow: 5px;
}
.profile-list ul {
    margin-top: 1%;
  list-style-type: none;
text-align:left;
  font-size: 25px;
}
li{
  border-bottom: 1px solid #a80000;
  margin-left: 15px;
}
.wrap-table{
  position: absolute;
  bottom: 5%;
  
  
}
table {
    border-collapse: collapse;
    table-layout: fixed;
    margin: 25px 0;
    font-size: 0.9em;
    padding: 0;
    font-family: sans-serif;
    width: 85%;
    height:225px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    text-align: center;
    margin-left:auto; 
    margin-right:auto;
   
    
}
tbody tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .25em;
    
    
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
#edit-profile{
  position: relative;
  width: 25%;
  top: 15%;
  left: 35%;
  height: 40px;
}
#delete-profile{
  position: relative;
  width: 25%;
  height: 40px;
  top: 25%;
  left: 9%;
}
input[type=password]{
  margin-top: 1%;
  margin-bottom: 2%;
}
</style>