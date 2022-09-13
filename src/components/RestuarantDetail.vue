<template>
  <b-button @click="back">
    Back
  </b-button>
  <b-container>
    <carousal-comp 
      :images="resturantDetails?.images"
      :overview="resturantDetails?.overview"
      :contact="resturantDetails?.address"
    />
  </b-container>
</template>
<script>
import { axiosInstance } from "./../api/axios";
import { GET_RESTURANT_DETAILS } from "./../api/endpoints";
import CarousalComp from "./CarousalComp.vue";
export default {
  components: {
    "carousal-comp": CarousalComp,
  },
  props: ["code"],
  data() {
    return {
      resturantDetails: null,
    };
  },
  methods: {
    back(){
      this.$router.push({
        'name':'landing'
      })
    },
    getRestuarantDetail() {
      const payload = {
        code: this.$props.code,
      };
      axiosInstance
        .get(GET_RESTURANT_DETAILS, { params: payload })
        .then((res) => {
          this.$data.resturantDetails = res.data;
        });
    },
  },
  created() {
    this.getRestuarantDetail();
  },
  beforeRouteEnter(to, from, next) {
    const store = from.matched[0].instances.default.$store
    console.log(store)
    // await store.dispatch('load')
    next()
  }
};
</script>

