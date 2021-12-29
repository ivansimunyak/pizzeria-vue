<template>
<div id="wrapper">
    <locations/>
  <h2 id="addNew">Add new type</h2>
  <div class="addType">
    <form class="form" @submit.prevent="submitForm">
    <label for="fname">City ID:</label><br>
  <input type="text" ref="inputName" id="name" name="name" required v-model="addingName"><br>
  <label for="fname">Name:</label><br>
  <input type="text" ref="inputName" id="name" name="name" required v-model="addingName"><br>
 <btn-styled type="submit">Submit</btn-styled>
</form>
</div>
    </div>
</template>
<script>
import Locations from "../components/Locations.vue";
export default {
    components:{
        Locations
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
</style>