<template>
  <b-container>
    <b-row>
      <b-col
        lg="3"
        sm="12"
        v-for="(item, index) in quickSearchFilters"
        :key="index"
      >
        <b-card
          :title="item.timing"
          :img-src="item.image"
          :img-alt="item.timing"
          class="mb-2"
          @click="()=>goToResturantList(item.code)"
        >
          <b-card-text>
            {{ item.description }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { axiosInstance } from "./../api/axios";
import { GET_QUICK_SEARCH_FILTERS } from "./../api/endpoints";

export default {
  data() {
    return {
      quickSearchFilters: [],
    };
  },
  methods: {
    fetchQuickSearchFilters() {
      axiosInstance.get(GET_QUICK_SEARCH_FILTERS).then((res) => {
        this.quickSearchFilters = res.data;
      });
    },
    goToResturantList(timingCode){
      this.$router.push(`/resturants/${timingCode}`)
    }
  },
  created() {
    this.fetchQuickSearchFilters();
  },
};
</script>

