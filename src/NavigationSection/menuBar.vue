<template>
  <div class="menu">
    <div class="menu__wrapper">
      <div>
        <button class="gobackbutton" @click=" goBack()"><img src="@/assets/acumenlogo.svg"/></button>
      </div>
      <div>
        
        <button class="redBtn"  @click="$emit('refresh')">Refresh Data</button>
        <button @click="logOut" class="logBtn">Log out</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/authStore';

const router = useRouter();
const authStore = useAuthStore();

const goBack = () => {
  router.go();
}

const logOut = () => {
  authStore.logout();
  router.push("/login");
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
}
.menu {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding: 20px 0px;
}
.menu__wrapper {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
