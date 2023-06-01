<template>
  <div class="menu">
    <div>
      <button class="gobackbutton" @click=" goBack()"><img src="@/assets/acumenlogo.svg"/></button>
     </div>
    <div>
      <button class="redBtn" @click="getUsers">Refresh Data</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
        users:[]
    }
  },
  methods: {
    // this is to refresh the entire window or page
    // refreshPage() {
    //   window.location.reload();
    // },

    getUsers() {
      const URL = "https://dolphin-app-4xaig.ondigitalocean.app/v1/contact";
      axios.get(URL).then((res) => {
        // console.log(res.data)
        this.users = res.data.reverse();
        console.log("this is recall");
      });
    },
    goBack() {
    this.$router.go(0);
  },
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
