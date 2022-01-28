<template>
  <div v-if="isWorking" id="navlist">
    <router-link to="/orders" >Orders</router-link>
    <router-link to="/messages">Messages</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/usertypes">User Types</router-link>
    <router-link to="/locations">Locations</router-link>
    <router-link to="/cities">Cities</router-link>
    <router-link to="/paymentmethods">Payment Methods</router-link>
    <router-link to="/about">Customer View </router-link>
  </div>
    <div v-if="!isWorking" id="navlistmortal">
    <router-link to="/home" >Home</router-link>
    <router-link to="/profile">Profile</router-link>
    <router-link to="/messageus">Message Us</router-link>
    <router-link to="/about">About Us</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
  </div>
  <router-view />
</template>
<script>
export default {
  data(){
    return{
      isWorking:false
    }
  }
}
</script>
<style>
body{
  background-image: url('assets/background.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin: 0;
  }
#app {
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navlist
{
    border-bottom: 1px solid #a80000;
    border-top: 1px solid #a80000;
    margin: 0;
    margin-bottom: 30px;
    padding: 0;
    padding-left: 50px;
    text-align: justify-all;
    background-color: #a80000;
    font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
    padding-bottom: 3px;
    padding-top: 3px;
}
#navlistmortal  
{
    border-bottom: 1px solid #a80000;
    border-top: 1px solid #a80000;
    margin: 0;
    margin-bottom: 30px;
    padding: 0;
    text-align: justify-all;
    background-color: #a80000;
    font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
    padding-bottom: 3px;
    padding-top: 3px;
}
#navlistmortal a{
  margin-left: 0.25%;
}
#navlistmortal li{
  left: 1500px;
  /* display: ; */
}
 a:link,a:visited
{
    border: 1px solid #a80000;
    padding: 1px 0.5em;
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;
     font-size: 13px;
}
 a:hover, a:active, a:focus
{
    border: 1px solid #ffffff;
    padding: 1px 0.5em;
    text-decoration: none;
    background-color: #ca0000;
    
}
 li
{
    padding-right: 1px;
    display: inline;
    font-size: 0.6em;
    text-align: center;
}
ul
{
    margin: 0;
    padding: 0;
    text-align: center;
}
a { background-color: #a80000; }

</style>
