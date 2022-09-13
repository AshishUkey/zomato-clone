<template>
  <b-container class="container-1">
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

export default {
  components:{
    'location-typeahead':LocationTypeahead
  },
  data() {
    return {
      selectedLocation: null,
      resturants: [],
      selectedResturant: null,
    };
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
       this.$data.resturants = res.data.map((item)=>{
        return { ...item, value: item.code, text: item.name };
       })
      });
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
  background-image: url("/src/images/hero.png");
}
.selectLocation {
  margin-top: 200px;
}
</style>
