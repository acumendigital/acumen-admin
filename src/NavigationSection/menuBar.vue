<template>
  <div class="menu">
    <div>
      <button class="gobackbutton" @click=" goBack()"><img src="@/assets/acumenlogo.svg"/></button>
     </div>
    <div>
      
      <button class="redBtn"  @click="$emit('refresh', true)">Refresh Data</button>
      <button @click="logOut" class="logBtn">Log out</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go();
}

const logOut = () => {
  router.push("/login");
}
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

.logBtn {
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.3s ease-in;
}

.logBtn:hover {
  opacity: 0.7;
}
.gobackbutton{
  background: transparent;
  border: none;
}
</style>
