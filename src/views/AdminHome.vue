<template>
  <div class="about">
    <h1>This is Admin Home {{statusMessage}}</h1>
  </div>
</template>
<script>
export default {
    data(){
        return{
            statusMessage:this.$route.params.removeSuccess
        }
    }
}
</script>
