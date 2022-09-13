<template>
  
    <b-form-select
      class="selectLocation"
      v-model="selectedLocation"
      :options="locations"
    ></b-form-select>
    <b-alert show v-if="error" variant="warning">
      {{errorMessage}}
    </b-alert>
    <slot>
      <!--NOTICE BOARD -->
    </slot>
</template>
  
  <script>
import { axiosInstance } from "./../api/axios";
import { GET_LOCATIONS } from "./../api/endpoints";

export default {
  emits: ["fetch-resturants"],
  data() {
    return {
      selectedLocation: null,
      locations: [],
      error:false,
      errorMessage:''
    };
  },
  methods: {
    fetchLocations() {
      axiosInstance.get(GET_LOCATIONS).then((res) => {
        this.$data.locations = res.data.map((item) => {
          return { ...item, value: item.code, text: item.name };
        })
      }).catch((err)=>{
        this.$data.error = true;
        this.$data.errorMessage = err;
      })
    },
  },
  watch: {
    selectedLocation: function (newValue) {
      if (newValue) {
        this.$emit("fetch-resturants", newValue);
      }
    },
  },
  created() {
    this.fetchLocations();
  },
};
</script>
  
  