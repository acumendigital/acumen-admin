<template>
   

       <div class="loader"></div>

 
</template>

<script>
       export default {
              
       }
</script>

<style scoped>
       
.loader {
  border: 6px solid transparent;
  border-radius: 50%;
  border-top: 6px solid #3498db;
  margin:auto;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>