<template>
  <div>
    <router-link to="/login"></router-link>
    <router-view> </router-view>
  </div>
</template>

<script>



export default {
  name: "App",
  components: {

  },
  data() {
    return {};
  }
};
</script>

<style>
#app {
  font-family: "DM Sans", sans-serif;

  /* margin-bottom: 200px; */
}
body {
  margin: 0px;
}
</style>
