<template >
  <section v-if="hideComponent">

    <div class="backbtn">
      <button class="redBtn" @click="hide">
        <router-link to="/dashboard">Back</router-link>
      </button>
    </div>
    <div class="wrapper">
     
      <div class="tab">
        <h3
          class="bluebg heading"
          :class="currentStep === 0 ? 'blue' : 'transparent'"
          @click="display(0)"
        >
          <span class="circlee"></span>
          Ventures ({{ venturesItems.length }})
        </h3>

        <!-- inner Userlists pages -->
        <div class="userlist" v-if="currentStep === 0">
          <table>
            <tbody>
              <!-- :class="{ active: userList === selectedItem }" -->
              <!-- <h3>step1</h3> -->
              <tr
                v-for="(userList, index) in [...venturesItems]"  
                :key="index"
               
                :class="[{ active: userList === selectedItem }, selectCircleClass(userList)]"
                @click="showDetails(userList)"
              >
                <td>{{ userList.name }}</td>
                <td>{{ userList.email }}</td>
                <!-- <td>{{ userList.form_type }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>

        <div class="userlistdigital" v-else-if="currentStep === 1">
          <table>
            <tbody>
              <!-- <h3>step2</h3> -->
              <!-- :class="{ active: userList === selectedItem }" -->
              <tr
                v-for="(userList, index) in [...digitalItems]"
                :key="index.form_type"
               
                :class="[{ active: userList === selectedItem }, selectCircleClass(userList)]"
                @click="showDetails(userList)"
              >
                <td>{{ userList.name }}</td>
                <td>{{ userList.email }}</td>
                <!-- <td>{{ userList.form_type }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="userlistcommunity" v-else-if="currentStep === 2">
          <table>
            <tbody>
              <!-- :class="{ active: userList === selectedItem }" -->
              <!-- <h3>step3</h3> -->
              <tr v-for="userList in [...communityItems]" :key="userList.index"
              
               :class="[{ active: userList === selectedItem }, selectCircleClass(userList)]"
                @click="showDetails(userList)">
                <td>{{ userList.name }}</td>
                <td>{{ userList.email }}</td>
                <!-- <td>{{ userList.form_type }}</td> -->
                
              </tr>
            </tbody>
          </table>
        </div>

        <h3
          :class="currentStep === 1 ? 'blue heading' : 'transparent heading'"
          @click="display(1)"
          
        >
          <span class="pinkcircle" ></span
          >Digital ({{ digitalItems.length}})
        </h3>

        <h3 :class="currentStep === 2 ? 'blue heading' : 'transparent heading'"
          @click="display(2)">
          <span class="purplecircle" ></span>Community 
          ({{ communityItems.length }})
        </h3>
        
      </div>

      <!-- START OF FORM -->
      <div class="innerdetail">
        <!-- <div > -->

        <div class="Fcircle" v-if="selectedItem">
          <h2>
            <span class="circle" >{{ selectedItem.name }}</span>
          </h2>

          <!-- <p>{{ currentDate }} ({{ currentTime }})</p> -->
          <p>{{new Date(selectedItem.created_at).toString().substring(0, 21)}}</p>
        </div>
        <!-- details for the form-->

        <div v-if="selectedItem">
          <p class="title">
            Name <br /><span>{{ selectedItem.name }}</span>
          </p>
          <p class="title">
            Email <br />
            <a :href="`tel:${selectedItem.email}`">{{ selectedItem.email }}</a>
          </p>
          <p v-if="selectedItem.phone" class="title">
            Pitch Deck<br />
            <a :href="`tel:${selectedItem.phone}`">{{ selectedItem.phone }}</a>
          </p>
          <p v-if="selectedItem.company" class="title">
            Company<br />
            <span class="para">{{ selectedItem.company }}</span>
          </p>
          <p v-if="selectedItem.country" class="title">
            Country<br />
            <span class="para">{{ selectedItem.country }}</span>
          </p>
          <p v-if="selectedItem.message" class="title">
            Message<br />
            <span class="para">{{ selectedItem.message }} </span>
          </p>
          <p v-if="selectedItem.about_company" class="title">
            About Company<br />
            <span class="para">{{ selectedItem.about_company }} </span>
          </p>
          <p v-if="selectedItem.pitch_deck" class="title">
            Pitch Deck<br />
            <a :href="selectedItem.pitch_deck">{{ selectedItem.pitch_deck }}</a>
          </p>
          <p v-if="selectedItem.linkedin" class="title">
            LinkedIn<br />
            <a :href="selectedItem.linkedin">{{ selectedItem.linkedin }}</a>
          </p>
          <p v-if="selectedItem.company_stage" class="title">
            Company Stage<br />
            <span class="para">{{ selectedItem.company_stage.toString() }} </span>
          </p>
        </div>
      </div>
    </div>
   
  </section>



</template>

<script>

import moment from "moment-timezone";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

export default {
  name: "ActiveOrder",
 
  props: {
    users: {
      type: Array,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    initialStep: {
      type: Number,
      default: 0,
    }
    
  },

  data() {
    return {
      currentStep: 0,
      hideComponent: true,
      currentTime: " ",
      selectedItem: null,
    };
  },
  computed: {
    currentDate() {
      const date = new Date();
      const options = { month: "long", day: "numeric", weekday: "long" };
      return date.toLocaleDateString(undefined, options);
    },
    venturesItems() {
      return this.users.filter((users) => users.form_type === "ventures").sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateB - dateA
      });
    },
    digitalItems() {
      return this.users.filter((users) => users.form_type === "digital" || users.form_type === '').sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateB - dateA
      });
    },
    communityItems() {
      return this.users.filter((users) => users.form_type === "community").sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateB - dateA
      });
    }
  },
  
  created() {
    this.currentStep = this.initialStep;
    
  },
  mounted() {
    moment.tz.setDefault("Africa/Lagos");
    const nowInLagos = moment.tz("Africa/Lagos");
    this.currentTime = nowInLagos.format("h:mm A");
  },
  methods: {
    display(val) {
      this.currentStep = val;
      this.$emit("goOpen");
    },
    goBack() {
      router.go(1);
    },
    hide() {
      this.hideComponent = false;
      this.$emit("goBack");
    },

    showDetails(userList) {
      this.selectedItem = userList;
    },
    selectCircleClass (userList) {
        // if (user.form_type === 'ventures') {
        //   return 'green-circle'
        // } else if (user.form_type === 'community') {
        //   return 'blue-circle'
        // } else {
        //   return 'red-circle'
        // }
        switch(userList.form_type) {
          case 'ventures':
            return 'green-circle'
          case 'community': 
            return 'blue-circle'
          default:
            return 'red-circle'
        }
      }
  },
};
</script>
<style scoped>
.tab {
  overflow-y: auto;
}
.heading {
  position: sticky;
  top: 0.5rem;
  z-index: 1;
  background-color: #FFF;
}
.circle::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #d3fff4;
  margin-right: 37px;
  position: relative;
  top: 0.3rem;
  /* top: 2px; */
}
.circlee::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #d3fff4;
  margin-right: 7px;
  position: relative;
  top: 0.3rem;
}
.pinkcircle::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffdede;
  margin-right: 7px;
  position: relative;
  top: 0.3rem;
  /* top: 2px; */
}
.purplecircle::before {
  background-color: #ccd9ff;
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 7px;
  position: relative;
  top: 0.3rem;
}

h3 {
  font-family: DM Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  cursor: pointer;
  text-align: center;
  /* margin-right: 20px; */
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
}

.active {
  background-color: #e8e8e8;
  border-radius:24px;
  /* padding-left:60px; */
  
}
.wrapper {
  padding: 40px;
  display: flex;
  max-width: 92%;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  gap: 2rem;
  align-content: center;
  margin: 0 auto;
  width: 1331px;
  

}
.backbtn {
  width: 1331px;
  margin: 0 auto;
}
.tab {
  position: relative;
  display: flex;

  border: 1px solid #dadada;
  border-radius: 24px;
  padding: 30px;
  width: 50%;
  height: 80vh;
  /* height: 45vh; */
}
.innerdetail {
  width: 45%;
  border: 1px solid #dadada;
  position: relative;
  border-radius: 24px;
  padding: 30px;
  /* padding-right: 150px; */
 
}
.title {
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 12px;
  font-weight: 700;
  padding: 0.8rem;
}
.title span {
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
}
.para {
  white-space: pre-wrap;
}
.para span {
  width: 30px;
  padding: 100px;
}
.bluebg {
  /* background: #e8e8e8; */
  height: 40px;
  /* width:150px; */
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Fcircle {
  display: flex;
  justify-content: space-between;
  background: #fdfdfd;

  padding: 2px 10px;
  border-radius: 24px;
}
.Fcircle h2 {
  font-size: 17px;
  font-weight: 300;
}
.userlist {
  position: absolute;
  top: 100px;
  left: 60px;
  right: 20px;

  /* left:140px; */
  /* bottom: 100px; */
  /* max-width: 70%; */
}
.userlistdigital {
  position: absolute;
  top: 100px;
  left: 60px;
  right: 20px;

  /* bottom: 100px; */
  /* max-width: 70%; */
}
.userlistcommunity {
  position: absolute;
  top: 100px;
  left: 60px;
  right: 20px;
 
  bottom: 100px;
}

tr::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #d3fff4;
  margin-right: 37px;

  position: relative;
  top: 1.3rem;
}
/* tbody tr:nth-of-type(even):before {
  background-color: #ffdede;
}
tbody tr:nth-of-type(odd):before {
  background-color: #d3fff4;
} */

tr.red-circle::before {
  background-color: #FFEEED;
}

tr.green-circle::before {
  background-color: #EBFFFA ;
}

tr.blue-circle::before {
  background-color: #E9EEFF;
}
td {
  /* width: 700px; */
  padding-right: 40px;
  
  /* padding-bottom: 50px; */
  /* height:10vh; */
}
tr {
  cursor: pointer;
  background: #fdfdfd;
  height: 60px;
}
tr::before{
  margin-right: 28px;
    margin-left: 20px;
}
table {
  border-collapse: initial;
  border-spacing: 0 30px;
}
.redBtn {
  background: #d3fff4;
  border-radius: 50px;
  padding: 12px;
  /* width: 190px; */
  /* height: 44px; */
  font-size: 15px;
  color: #000000;
  border: none;
  position: relative;
  top: 14px;
  left: 5px;
}
a {
  color: #fb242a;
  text-decoration: underline;
}
.blue {
  background-color: #e8e8e8;
  color: #000000;
}
.transparent {
  background-color: transparent;
  color: #000000;
}
#other-button {
  display: none;
}

</style>
