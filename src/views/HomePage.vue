<template>
<h1>This is home {{user}}</h1>
<h2>{{isAdmin}}</h2>
    <home/>
</template>
<script>
import { mapGetters } from 'vuex'
import Home from "../components/Home.vue"
export default {
    components:{
        Home
    },computed: {
    ...mapGetters(['user','isAdmin'])
}

}
</script>