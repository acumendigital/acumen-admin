<template>
  <section>
    <dash-board :users="users" ></dash-board>
   <div class="wrap" >

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
    
  <!-- <div> -->
    
   <spin-loader v-if="isLoading === true"></spin-loader>
     
   <table v-else>
     
    
       <tbody>
      
         <tr v-for="(user, index) in [...users].slice(0,5)" :key="index" @click="openComponent(index)" :class="selectCircleClass(user)" >
          
            <!-- <td v-text="user.name" class="cell1" ></td> -->
            <td   class="cell1" >{{user.name}}</td>
            <!-- new Date('2022-03-08T17:21:44.771Z').toString().substring(0, 21) -->
            <!-- (user.created_at) -->
             <td  class="cell">{{new Date(user.created_at).toString().substring(0, 21)}}</td>
             <td  class="cellTwo">{{user.email}}</td>
             
         
        </tr>
       </tbody>
       
    </table>
   
  <!-- </div> -->
 
</div>

</div>


 




</section>
<div class="activeSection">
 
 <active-order v-if="isComponentOpen" :users="users" :isLoading="isLoading"></active-order>
 
 <!-- this section allow us to click to each of the ventures -->
 
</div>
</template>


<script>
import spinLoader from './spinLoader.vue'
import DashBoard from './DashBoard.vue';
import ActiveOrder from './ActiveOrder.vue';
import axios from 'axios'

  // async function getCountries() {
  //       const promise = await fetch("https://restcountries.com/v3.1/all");
  //       const data = await promise.json();
  //       console.log(data);
  //     }
  //     getCountries();
export default {
  name:'TableViewDunni',

  el:"#app",
  components:{ActiveOrder, DashBoard, spinLoader},

    data(){
      return{
        message:'helo',
        users:[],
        isComponentOpen: false,
        activeIndex: null,
        isComponentBOpen: true,
        isLoading:true
    
       
      
     
      }
     
    },
     
    
   methods:{
      selectCircleClass (user) {
        // if (user.form_type === 'ventures') {
        //   return 'green-circle'
        // } else if (user.form_type === 'community') {
        //   return 'blue-circle'
        // } else {
        //   return 'red-circle'
        // }
        switch(user.form_type) {
          case 'ventures':
            return 'green-circle'
          case 'community': 
            return 'blue-circle'
          default:
            return 'red-circle'
        }
      },
       getUsers(){
        this.users=[]
        this.isLoading= true
        const URL = "https://dolphin-app-4xaig.ondigitalocean.app/v1/contact/";
        axios
        .get(URL)
        .then(res => {
          console.log(res.data)
          this.users = res.data.data.reverse()
          this.isLoading= false
          console.log('this is recall')
        })
      
      },
      openComponent(index) {
      this.isComponentOpen = !this.isComponentOpen;
      
      this.isComponentBOpen = false;
      this.activeIndex = index;
    },
    changeUserName() {
      this.message = 'Data has been refreshed!';
      this.$forceUpdate();
    },
  
  },

    mounted(){
      this.getUsers();
      
      
    },

}
</script>
<style scoped>


.wrap{
  border: 1px solid #C4C4C4;
  border-radius:20px;
  top:5rem; 
  position: relative;
  padding:80px 60px 40px 60px ;
  height: auto;
  max-width: 1200px;
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

  margin-top:-30px;
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


tr::before{
  content: "";
  display:inline-block;
  width:20px;
  max-width: 20px;
  height: 20px;
  /* max-height: 20px; */
  border-radius: 50%;
  /* background-color:  #D3FFF4; */
  margin-right: 17px;
  position: relative;
  margin-top:22px;
 /* top:1.5rem; */
  text-align: center;
  /* top: 0.5rem; */
 
}
/* THIS IS COLOR FOR BULLETPOINTS */
/* tbody tr:nth-of-type(even):before {
  background-color: #FFDEDE;
} */

/* THIS IS COLOR FOR BULLETPOINTS */
tr.red-circle::before {
  background-color: #FFEEED;
}

tr.green-circle::before {
  background-color: #EBFFFA ;
}

tr.blue-circle::before {
  background-color: #E9EEFF;
}



.cell{
  padding-left: 15rem;
 
}
.cellTwo{
  padding-left: 15rem;
}
.cell1{
  padding-left: 3rem;
  
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
