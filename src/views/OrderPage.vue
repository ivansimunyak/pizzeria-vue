<template>
  <div class="orders">
    <h1 v-if="statusMessage">Order removed successfully! </h1>
    <orders></orders>
  </div>
  
</template>

<script>
// @ is an alias to /src
import Orders from '../components/Orders.vue';

export default {
  name: "OrderPage",
  components: {
    Orders,
  },
  data(){
    return{
      statusMessage:this.$route.params.removeSuccess

    }
  }
}
</script>
<style scoped>
h1{
  font-family: 'Times New Roman', Times, serif;
color: black;
}

</style>
