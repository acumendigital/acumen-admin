<template>
  <section>
    <div>
   
      <div class="userdetails" >
        <div><h3>Hello, {{ currentUserName }} 👋</h3></div>
        <div>
          <p>
            <b>{{ currentDate }}</b> <br />
            <span class="time">{{ currentTime }} in lagos</span>
          </p>
        </div>
      </div>

      <div class="contentBox" >
        <div class="ventureBox" @click="showComponentB(0)">
          <h2>Ventures</h2>

          <p>{{ ventureCount.length }}</p>
        </div>

        <div class="digitalBox" @click="showComponentB(1)">
          <h2>Digital</h2>
          <p>{{digitalCount}} </p>
        </div>
  
        <div class="communityBox"  @click="showComponentB(2)">
          <h2>Community</h2>
          <p>{{ communityCount.length}} </p>
        </div>
      </div>
      <div class="activeSection">
        <active-order
         
          v-if="componentToShow"
          @go-back="componentToShow=null"
          :initial-step="selectedStep"
          :users="users"
        ></active-order>
      
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, onMounted, ref, computed } from "vue";
import ActiveOrder from "./ActiveOrder.vue";
import moment from "moment-timezone";
import { useAuthStore } from "../../store/authStore";

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

const authStore = useAuthStore();

const currentTime = ref("");
const componentToShow = ref(null);
const selectedStep = ref(0);

const currentUserName = computed(() => {
  if (authStore.user && authStore.user.name) {
    return authStore.user.name
  }
  return 'Ayo'
})

const currentDate = computed(() => {
  const date = new Date();
  const options = { month: "long", day: "numeric", weekday: "long" };
  return date.toLocaleDateString(undefined, options);
});

const ventureCount = computed(() => {
  return props.users.filter((users) => users.form_type === "ventures")
});

const digitalCount = computed(() => {
  return props.users.filter((users) => users.form_type === "" ).length + props.users.filter((users) => users.form_type === "digital").length
});
const communityCount = computed(() => {
  return props.users.filter((users) => users.form_type === "community")
});

const showComponentB = (step) => {
  selectedStep.value = step;
  componentToShow.value = "display(val)";
}

onMounted(() => {
  moment.tz.setDefault("Africa/Lagos");
  const nowInLagos = moment.tz("Africa/Lagos");
  currentTime.value = nowInLagos.format("h:mm A");
});
</script>

<style scoped>
  section {
    background: #FFFFFF;
  }
.mes{
  background: red;
  width:50px;
  height:50px;
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
.userdetails {
  max-width: 1200px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
 
 position: relative;
 
  /* gap:60rem; */
  /* gap:69rem;   */
  padding-top: 30px;
}
.userdetails h3 {
  font-weight: 300;
}
.contentBox {
  position: relative;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
  align-content: center;
  margin: 0 auto;
  /* width: 90%; */
  max-width: 1200px;
  width: 90%;
  top: 2rem;
  bottom: 3rem;
}
.ventureBox {
  background: rgba(235, 255, 250, 1);
  font-weight: 400;
  width: 100%;
  height: 125px;
  border: 1px solid #000000;
  border-radius: 24px;
  padding: 10px 25px;
  position: relative;
  left: 0;
  cursor: pointer;
  /* flex:1; */
}
.ventureBox h2,
.digitalBox h2,
.communityBox h2 {
  font-size: 20px;
  line-height: 30px;
  font-weight: 400;
}
.ventureBox p {
  position: relative;
  font-size: 34px;
  line-height: 38px;
  text-align: right;
  /* left:20.5rem; */
  bottom: 0rem;
}
.digitalBox {
  background: #ffeded;
  width: 100%;
  height: 125px;
  border: 1px solid #000000;
  border-radius: 24px;
  padding: 10px 25px;
  cursor: pointer;
}

.digitalBox p,
.communityBox p {
  position: relative;
  font-size: 34px;
  line-height: 38px;
  text-align: right;
  bottom: 0rem;
}
.communityBox {
  background: #e9eeff;
  width: 100%;
  height: 125px;
  border: 1px solid #000000;
  border-radius: 24px;
  padding: 10px 25px;
  cursor: pointer;
}
.time {
  font-size: 12px;
  margin-left: 20px;
}
div .activeSection {
  position: absolute;
  /* top: -300px; */
  left: 0;
  right: 0;
  top:90px;
  /* margin-top: 3rem; */
  background: #ffffff;
  z-index: 8;
 
}
</style>
