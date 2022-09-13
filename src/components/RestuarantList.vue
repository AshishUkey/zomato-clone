<template>
  <b-container>
    <b-row>
      <b-col lg="12" v-if="getActiveResturants.length == 0">
        <b-alert show variant="warning"
          >No data found for given filters</b-alert
        >
      </b-col>
      <b-col lg="12" v-if="getActiveResturants.length > 0">
        <b-card class="mb">
            <add-resturant/>
            <button @click="add()">Add Resturant</button>
        </b-card>
        
        <TransitionGroup name="resturants" tag="ul">
          
          <li v-for="(resturant, index) in getActiveResturants" :key="index">
            <b-card
            class="mb"
            :key="index"
            @click="() => goToDeatails(resturant.code)"
          >
            <b-row>
              <b-col sm="3" lg="3">
                <img width="100" height="100" :src="resturant.images?.[0]" />
              </b-col>
              <b-col sm="9" lg="9">
                <p>
                  {{ resturant.name }}
                </p>
                <p>
                  {{ resturant.cost }}
                </p>
                <p>
                  {{ resturant.overview }}
                </p>
                <p>
                  {{ resturant.cuisine }}
                </p>
                <p>
                  {{ resturant.timing_codes }}
                </p>
                <p>
                  {{ resturant.location_codes }}
                </p>
              </b-col>
            </b-row>
          </b-card>
          </li>
        </TransitionGroup>
      </b-col>
      
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters , mapActions} from 'vuex';
import AddResturant from "./AddResturant.vue";
export default {
  components:{
    "add-resturant": AddResturant,
    AddResturant
},
  data(){
    return {
      
    }
  },
  computed:{
    ...mapGetters('food',['getActiveResturants'])
  },
  methods: {
    ...mapActions({'captureActiveResturant':'food/captureActiveResturant'}),
    goToDeatails(code) {
      this.$router.push(`/resturant/${code}`);
    },
    add(){
      // If post call success and gives an id
      this.captureActiveResturant([{
        'name':'newResturant'
      },...this.getActiveResturants],)
    }
  },
};
</script>
<style scoped>
  .mb {
    margin-bottom: 20px;
  }
  ul {
    list-style: none;
    margin: 1rem 0;
    padding: 0;
  }
  li {
    border: 1px solid #ccc;
    padding: 1rem;
    text-align: center;
  }
  
  .resturants-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  .resturants-enter-active {
    transition: all 1s ease-out;
  }
  
  .resturants-enter-to,
  .resturants-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  
  .resturants-leave-active {
    transition: all 1s ease-in;
  }
  
  .resturants-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .resturants-move {
    transition: transform 0.8s ease;
  }
  </style>

