<template>
  <b-container class="filterHolder">
    <b-row>
      <location-typeahead @fetch-resturants="captureSelectedLocation"/>
    </b-row>
    <b-row>
      <h5 class="mb">Cuisines</h5>
      <b-form-checkbox
        v-for="(cusine, index) in cuisineFilters"
        :key="index"
        v-model="payload.selectedCuisine"
        :value="cusine.code"
      >
        {{ cusine.name }}
      </b-form-checkbox>
    </b-row>
    <b-row>
      <h5 class="mb">Cost for 2</h5>
      <b-form-radio v-model="payload.selectedCostRange" name="cost" :value="range1">100 - 500</b-form-radio>
      <b-form-radio v-model="payload.selectedCostRange" name="cost" :value="range2">500 - 1000</b-form-radio>
    </b-row>
  </b-container>
</template>
<script>
  import LocationTypeahead from "./LocationTypeahead.vue";

export default {
  emits: ["handleFilter"],
  components:{
    'location-typeahead':LocationTypeahead,
  },
  data() {
    return {
      range1:{
        'from':100,
        'to':500
      },
      range2:{
        'from':500,
        'to':1000
      },
      cuisineFilters: [
        {
          name: "South Indian",
          code: "SI",
        },
        {
          name: "North Indian",
          code: "NI",
        },
      ],
      payload:{
        selectedCuisine: [],
        selectedCostRange:'',
        location_code:[],
      }
    };
  },
  methods:{
    captureSelectedLocation(selectedLocation){
      console.log("UPDATE THE PAYLOAD")
      this.payload.location_code = [selectedLocation];
    }
  },
  watch: {
    payload: {
     handler(newVal){
      if(newVal){
        this.$emit('handleFilter',{...newVal})
      }
      },
     deep: true
  }
  }
};
</script>
<style scoped>
  .filterHolder{
    border: solid 1px #ccc;
    padding:30px;
  }
  .mb{
    margin: 20px;
  }
</style>


