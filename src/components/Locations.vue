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
                <td>{{location.name}}</td>
                <td>{{location.cityName}}</td>
                <td><btn-styled class="btnEdit" @click="editType(location.id,location.name,index)">Edit</btn-styled> </td>
                <td><btn-styled class="btnDelete" @click="removeType(type.id,index)">Remove</btn-styled> </td>
            </tr>
        </tbody>
    </table>
</section>
</template>


<script>
export default {
    data(){
        return{
            locations:[]
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
</style>