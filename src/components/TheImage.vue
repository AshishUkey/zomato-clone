<template>

  <dialog open v-if="showForm" class="showOnTop">
    <h4 class="form-title">Enter Your Credentials</h4>
    <the-auth-form @handle-submit="handleFormSubmit" />
  </dialog>



  <b-container class="container-1">
    <b-row > 
      <b-col class="login-item">
        <b-link v-if="!isLoggedIn"  @click="showLoginForm" class="login" >Login</b-link>
        <b-link v-if="isLoggedIn"  @click="logout" class="login" >Logout</b-link>
        <b-link href="#foo" class="login" v-if="!isLoggedIn">Ceate an Account</b-link>
      </b-col>
     
    </b-row>
    <b-row>
      <b-col alignSelf="center" lg="6" offset-lg="3" class="selectTitle">
<h3 v-if="isLoggedIn" class="loggedInTitle">Welcome {{userDetails?.userName}}</h3>
        <h2 > Find the Best Resturant, Cafe's and Bars...</h2>
      </b-col>
      
    </b-row>
    <b-row>
      
      <b-col alignSelf="center" lg="3" offset-lg="3" class="selectLocation">
        
        <location-typeahead @fetch-resturants="fetchResturants" >
          
        </location-typeahead>
      </b-col>
      <b-col alignSelf="center" lg="3">
        <b-form-select
          class="selectLocation"
          v-model="selectedResturant"
          :options="resturants"
          :disabled="!selectedLocation"
        ></b-form-select>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { axiosInstance } from "./../api/axios";
import { GET_RESTURANTS } from "./../api/endpoints";
import LocationTypeahead from "./LocationTypeahead.vue";
import TheAuthForm from "./TheAuthForm.vue";
import { LOGIN } from "./../api/endpoints";
import jwt_decode from "jwt-decode";
import { mapGetters, mapActions } from "vuex";

export default {
  components:{
    'location-typeahead':LocationTypeahead,
    "the-auth-form": TheAuthForm,
  },
  data() {
    return {
      selectedLocation: null,
      resturants: [],
      selectedResturant: null,

      showForm: false,
      token:null,
      decodedToken:null,
    };
  },
  computed: {
    ...mapGetters('authentication',['isLoggedIn','userDetails'])
  },
  mounted(){
    this.$data.token = sessionStorage.getItem("token")
  },
  methods: {
    fetchResturants(selectedLocation) {
      this.$data.selectedResturant = null;
      this.$data.selectedLocation = selectedLocation;
      this.$data.resturants = [];
      const payload = {'location_code':[selectedLocation]};
      axiosInstance.get(GET_RESTURANTS,{
        'params':payload
      }).then((res) => {
       this.$data.resturants = res.data.resturants.map((item)=>{
        console.log("item", + item);
        return { ...item, value: item.code, text: item.name };
       })
      });
    },

    ...mapActions({
      updateLoginState: "authentication/updateLoginState",
      setAuthorization: "authentication/setAuthorization",
      setUserDetails: "authentication/setUserDetails",
    }),
    logout(){
      sessionStorage.clear();
      this.updateLoginState(false)
    },
    handleFormSubmit(authData) {
      axiosInstance.post(LOGIN, { ...authData }).then((res) => {
        if(res.result == 'success'){
          sessionStorage.setItem("token", res.data.token);
          console.log(res.data.token);
          const decodedToken = jwt_decode(res.data.token);
          console.log(decodedToken);
          this.$data.showForm= false
          this.updateLoginState(true)
          this.setAuthorization(decodedToken.authorizationDetails);
          this.setUserDetails(decodedToken.userDetails)
        }
      });
    },
    showLoginForm() {
      this.$data.showForm = true;
    },

  },
  watch: {
    selectedResturant: function (newValue) {
        console.log("selectedResturant changed");
        console.log(newValue)

      if (newValue) {
        this.$router.push(`/resturant/${this.$data.selectedResturant}`)
      }
    },
  },
  
};
</script>

<style scoped>
.container-1 {
  position: relative;
  height: 500px;
  
}

.container-1::before {    
  content: "";
  background-image: url("/src/images/hero.png");
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.9;
}
.selectLocation {
  margin-top: 10px;
  position: relative;
}

.selectTitle {
  
  margin-top: 190px;
  color: white;
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  z-index: 1;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  
}
.login-item{
  text-align: end;
  margin-top: 20px;
  margin-right: 20px;
}
.login{
  position: relative;
  color: white;
  text-decoration: none;
  padding: 15px;
  font: 300;
}

.login:hover{
  position: relative;
  color: white;
  text-decoration: none;
  padding: 13px;
  text-align: end;
  font: 300;
  border: 2px solid white;
}
.showOnTop {
  z-index: 999;
  width: 400px;
  margin-top: 100px;
  border-radius: 15px;
}
.form-title{
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.loggedInTitle{
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>
