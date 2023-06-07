<template>
  <div class="menu">
    <div>
      <button class="gobackbutton" @click=" goBack()"><img src="@/assets/acumenlogo.svg"/></button>
     </div>
    <div>
      
      <button class="redBtn"  @click="$emit('refresh')">Refresh Data</button>
      
    </div>
  </div>
</template>

<script>

export default {
  emits:['refresh'],
  
  data(){
    return{

    }
  },
  
  

  methods: {
    
    },
    goBack() {
    this.$router.go();
  },
 

};
</script>
<style scoped>
* {
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
}
.menu {
  max-width: 100%;
  display: flex;
  justify-content: center;
  gap: 61rem;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding: 20px 0px;
}
.redBtn {
  background: #fb242a;
  border-radius: 50px;
  width: 190px;
  height: 44px;
  font-size: 18px;
  color: #fff;
  border: none;
}
.gobackbutton{
  background: transparent;
  border: none;
}
</style>
