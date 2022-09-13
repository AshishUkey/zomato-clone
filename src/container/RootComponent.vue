<template>
  <b-container>
    <b-row>
      <the-image />
    </b-row>
    <b-row>
        <h4>Quick Search</h4>
    </b-row>
    <b-row>
      <the-quick-search-filters/>
    </b-row>
  </b-container>
</template>

<script>
import TheImage from "./../components/TheImage.vue";
import TheQuickSearchFilters from "./../components/TheQuickSearchFilters";
// import TheFoodForm from "./../components/TheFoodForm.vue";
import { ADD_FOOD, GET_FOOD, DELETE_FOOD } from "../api/endpoints";

import { mapActions, mapGetters } from "vuex";
import { axiosInstance } from "@/api/axios";
import callToServer from "@/mixin/callToServer";

export default {
  name: "RootComponent",
  components: {
    "the-image": TheImage,
    "the-quick-search-filters": TheQuickSearchFilters,
  },
  mixins: [callToServer],
  data() {
    return {
      showForm: false,
    };
  },
  methods: {
    ...mapActions({
      captureFoood: "food/captureFoood",
    }),
    handleShowForm() {
      this.alert();
      this.$data.showForm = true;
    },
    handleFormSubmit(payload) {
      axiosInstance.post(ADD_FOOD, { ...payload }).then((response) => {
        if (response.result === "success") {
          // this.captureFoood(updatedFood);
          const updatedNewFood = { ...payload, _id: response.data };
          this.captureFoood([...this.getFood, { ...updatedNewFood }]);
          this.$data.showForm = false;
        } else {
          console.log("Logged an error");
        }
      });
    },
    fetchFoods() {
      axiosInstance
        .get(GET_FOOD)
        .then((response) => {
          console.log("within axios");

          if (response.result === "success") {
            console.log("within success");

            // this.$data.error= false;
            this.captureFoood(response.data);
            this.$data.loading = false;
          } else {
            this.$data.error = true;
            this.$data.loading = false;
          }
        })
        .catch((e) => {
          this.$data.error = true;
          this.$data.loading = false;
          this.$data.errorMessage = e;
        });
    },
    handleDelete(deleteId) {
      const payload = { deleteId: deleteId };
      axiosInstance.delete(DELETE_FOOD, { data: payload }).then((response) => {
        if (response.result === "success") {
          // search array index from store and splice it and pass spliced data back to store
          let updatedFood = this.getFood;
          const foodIndexToSplice = this.getFood.findIndex((item) => {
            return item._id == deleteId;
          });
          if (foodIndexToSplice != -1) {
            updatedFood.splice(foodIndexToSplice, 1);
          }
          this.captureFoood(updatedFood);
        } else {
          console.log("Logged an error");
        }
      });
    },
  },
  computed: {
    ...mapGetters("food", ["getFood"]),
  },
};
</script>
