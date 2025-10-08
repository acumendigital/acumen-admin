<template>
  <div>
    <menuBar @refresh="handleRefresh"/>
  
    <!-- <p>{{refreshKey}}</p> -->
    <TableView @refresh="handleRefresh" />
    
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

  const handleRefresh = (val) => {
    refresh.value = val;
  }
</script>

<style scoped>
  div{
    padding-bottom: 6rem;
  }
</style>
     