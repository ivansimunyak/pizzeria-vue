<template>
  <div id="navlist">
    <router-link to="/orders">Orders</router-link>
    <router-link to="/messages">Messages</router-link>
    <router-link to="/about">Products</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/usertypes">User Types</router-link>
    <router-link to="/locations">Locations</router-link>
    <router-link to="/cities">Cities</router-link>
    <router-link to="/paymentmethods">Payment Methods</router-link>
    <router-link to="/about">Customer View </router-link>
  </div>
  <router-view />
</template>

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
    padding-left: 180px;
    text-align: justify-all;
    background-color: #a80000;
    font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
    padding-bottom: 3px;
    padding-top: 3px;
}
#navlist a, #navlist a:link, #navlist a:visited
{
    border: 1px solid #a80000;
    padding: 1px 0.5em;
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;
     font-size: 13px;
     

}
#navlist a:hover, #navlist a:active, #navlist a:focus
{
    border: 1px solid #ffffff;
    padding: 1px 0.5em;
    text-decoration: none;
    background-color: #aa3f3f;
    
}
#navlist li
{
    padding-right: 1px;
    display: inline;
    font-size: 0.6em;
    text-align: center;
}
#navlist ul
{
    margin: 0;
    padding: 0;
    text-align: center;
}
#navlist #active a { background-color: #970505; }
</style>
