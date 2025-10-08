<template>
  <div>
    <menuBar @refresh="refresh = true"/>
  
    <!-- <p>{{refreshKey}}</p> -->
    <TableView :refresh-trigger="refresh" @refreshed="refresh = false" />
    
  </div>
</template>

<script>
  export default {
    name: 'DashboardPage'
  }
</script>

<script setup>
  import { ref } from "vue";
  import TableView from "./components/TableView.vue";
  import menuBar from "./NavigationSection/menuBar.vue";

  const refresh = ref(false);

</script>

<style scoped>
  div{
    padding-bottom: 6rem;
  }
</style>
     