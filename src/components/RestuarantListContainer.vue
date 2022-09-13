<template>
  <b-container>
    <b-row class="mb-30">
      <h3>All resturants who serve {{ getTimingName }}</h3>
    </b-row>
    <b-row>
      <b-col lg="3">
        <restuarant-filter @handleFilter="fetchRestuarants" />
      </b-col>
      <b-col lg="9">
        <div v-if="totalFilteredResturants">
          <restuarant-list
            :totalFilteredResturants="totalFilteredResturants"
          />
          <b-pagination
            v-model="currentPage"
            :total-rows="totalFilteredResturants"
            :per-page="limit"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
          ></b-pagination>
        </div>

        <h1 v-if="!totalFilteredResturants">
          Loading....
        </h1>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { axiosInstance } from "../api/axios";
import { GET_RESTURANTS } from "../api/endpoints";
import RestuarantList from "./RestuarantList.vue";
import RestuarantFilter from "./RestuarantFilter.vue";
import { codeAbbrevations } from "../constants/";
import { mapActions } from 'vuex';
export default {
  components: {
    "restuarant-list": RestuarantList,
    "restuarant-filter": RestuarantFilter,
  },
  props: ["timingCode"],
  data() {
    return {
      totalFilteredResturants: null,
      currentPage: 1,
      limit: 2,
    };
  },
  methods: {
    ...mapActions({'captureActiveResturant':'food/captureActiveResturant'}),
    fetchRestuarants(payload = null) {
      let params = {

      };
      const defaultPayload = {
        'page':this.$data.currentPage,
        'limit':this.$data.limit
      }
      if (payload) {
        params = {
          ...payload,
          timing_codes: [this.$props.timingCode],
          ...defaultPayload
        };
      } else {
        params = {
          timing_codes: [this.$props.timingCode],
          ...defaultPayload
        };
      }
      axiosInstance.get(GET_RESTURANTS, { params: params }).then((res) => {
        // this.$data.filteredRestaurants = res.data.resturants;
        this.captureActiveResturant(res.data.resturants)
        this.$data.totalFilteredResturants = res.data.total;
      });
    },
  },
  computed: {
    getTimingName() {
      return codeAbbrevations[this.$props.timingCode];
    },
  },
  watch:{
    currentPage(newVal,oldVal){
      if(newVal != oldVal){
        this.fetchRestuarants();
      }
    }
  },
  created() {
    this.fetchRestuarants();
  },
};
</script>
<style scoped>
.mb-30 {
  margin-bottom: 30px;
}
</style>

