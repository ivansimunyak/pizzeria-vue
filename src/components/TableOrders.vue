<template>
 <table class="table">
     <thead>
          <tr>
              <th v-for="(header, index) in headers" :key="index">{{header}}</th>
              <th>Subtotal</th>
          </tr>
         
     </thead>
      <tbody>
          <tr v-for="(item, index) in items" :key="index">
              <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{item[column]}}</td>
            <td>{{item[columnsX[0]]*item[columnsX[1]]}} </td>
          </tr>
    
      </tbody>
    </table>
</template>
<script>
export default {
 props:['columns','items','headers','columnsX'],
  data(){
         return{
         }
     }
}
</script>



<style scoped>
table {
    border-collapse: collapse;
    table-layout: fixed;
    margin: 25px 0;
    font-size: 0.9em;
    padding: 0;
    font-family: sans-serif;
    min-width: 400px;
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
</style>