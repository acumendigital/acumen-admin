<template>
  <section>
    <dash-board :users="users" ></dash-board>
    <div class="wrap">
      <div>
        <div class="subdetails">
          <div> <h3 class="recent">Most Recent Entries</h3></div>
            <div>
              <h3 class="bluebg">
                <span class="circle"></span>
                    Ventures
                
              </h3>
            
            <h3><span class="pinkcircle"></span>Digital</h3> 
            <h3><span class="purplecircle"></span>Community</h3> 
            </div>
            <!-- <button class="redBtn" @click="changeUserName()">Refresh Data</button> -->
        </div>
        
        <spin-loader v-if="isLoading === true"></spin-loader>
        
        <table v-else>
          <tbody>
            <tr
              v-for="(user, index) in users.slice(0,5)"
              :key="index"
              @click="openComponent(index)"
              class="table-row"
            >
              <td class="cell1" >
                <div
                :class="selectCircleClass(user)"
              ></div>
              </td>
              <td   class="cell" >{{user.name}}</td>
              <!-- new Date('2022-03-08T17:21:44.771Z').toString().substring(0, 21) -->
              <!-- (user.created_at) -->
              <td  class="cell">{{new Date(user.created_at).toString().substring(0, 21)}}</td>
              <td  class="cell">{{user.email}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <div class="activeSection">
    <active-order v-if="isComponentOpen" :users="users" :isLoading="isLoading"></active-order>
  <!-- this section allow us to click to each of the ventures -->
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, defineEmits, watch, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import spinLoader from './spinLoader.vue';
import DashBoard from './DashBoard.vue';
import ActiveOrder from './ActiveOrder.vue';
import { useAuthStore } from '../../store/authStore';

const props = defineProps({
  refreshTrigger: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refreshed']);

const authStore = useAuthStore();
const router = useRouter();

// const message = ref('hello');
const users = ref([]);
const isComponentOpen = ref(false);
const activeIndex = ref(null);
const isComponentBOpen = ref(true);
const isLoading = ref(true);

watch(() => props.refreshTrigger, (isRefreshing) => {
  if (isRefreshing) {
    getUsers();
  }
});

const selectCircleClass = (user) => {
  switch(user.form_type) {
  case 'ventures':
    return 'green-circle'
  case 'community': 
    return 'blue-circle'
  default:
    return 'red-circle'
  }
}

const getUsers = async () => {
  users.value = [];
  isLoading.value = true;

  const URL = "https://dolphin-app-4xaig.ondigitalocean.app/v1/admin/contact/";
  axios.get(URL, {
    headers: {
      'Authorization': `Bearer ${authStore.token || ''}`
    }
  })
  .then(res => {
    const responseData = res.data.data;
    const updatedResponseData = responseData.filter(item => item.form_type !== "" && (item.form_type === "ventures" || item.form_type === "digital" || item.form_type === "community"));
    users.value = updatedResponseData.reverse()
    isLoading.value = false;
    emit('refreshed');
  })
  .catch(err => {
    if (err.response?.status === 401 || err.response?.status === 400) {
      authStore.logout()
      router.push("/login")
    }
  })
}

const openComponent = (index) => {
  isComponentOpen.value = !isComponentOpen.value;
  isComponentBOpen.value = false;
  activeIndex.value = index;
}

// const changeUserName = () => {
//   message.value = 'Data has been refreshed!';

// }

onMounted(() => {
  getUsers();
})
</script>

<style scoped>
.wrap{
  border: 1px solid #C4C4C4;
  border-radius:20px;
  top:5rem; 
  position: relative;
  padding:40px 60px 40px 60px ;
  height: auto;
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;

  /* height: 100vh;
   */
}


.subdetails{
  display:flex;
  width:100%;
  justify-content: space-between;
}
.subdetails div:nth-child(2){
  display:flex;
}

.circle::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color:  #D3FFF4;
  margin-right: 7px;
  position: relative;
  top: 0.3rem;
  /* top: 2px; */
}
.pinkcircle::before{
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color:   #FFDEDE;
  margin-right: 7px;
  position: relative;
  top: 0.3rem;
  /* top: 2px; */
}
.purplecircle::before{
  background-color:#CCD9FF;
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 7px;
  position: relative;
  top: 0.3rem;
}
h3{
  font-family: DM Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  margin-right: 20px;
}
.recent {
 font-family: DM Sans;
font-size: 24px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0px;
text-align: left;

}

table {
  width: 100%;
}

tr.table-row {
  transition: all 0.3s ease-in-out;
}

tr.table-row:hover {
  background-color: rgb(153 149 149 / 10%);
  opacity: 0.7;
}

/* THIS IS COLOR FOR BULLETPOINTS */
tr td.cell1 div {
  display:block;
  width:20px;
  max-width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 17px;
  position: relative;
  margin-top:22px;
  /* top: 0.5rem; */ 
}
tr td.cell1 .red-circle {
  background-color: #FFEEED;
}

tr td.cell1 .green-circle {
  background-color: #EBFFFA ;
}

tr td.cell1 .blue-circle {
  background-color: #E9EEFF;
}

div .activeSection{
  position: absolute;
  top:0;
  left:0;
  right:0;
  margin-top: 6rem;
  background: white;
}

tr{
  cursor: pointer;
  /* margin-bottom: 30px; */
  background: #FDFDFD;
  /* padding-left: 20px; */
  border-radius: 20px;
  background: #FDFDFD ;
  height:80px;

 
}
table{
  font-size:18px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  height:10vh;
  border-collapse:initial;
  border-spacing: 0 10px;
  
}


</style>
