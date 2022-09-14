<template>
  <b-container>
    <div class="container">
      <dialog open v-if="showMenuCard" class="bringFront">
        <h1>Load a seperate component with menu items fro here</h1>
        <ul>
          <li>Idly</li>
          <li>Vada</li>
          <li>Dosa</li>
          <li>Pav Bhajji</li>
          <li>Vada Pav</li>
          <li>Hydrebadi biryani</li>
        </ul>
    </dialog>
    </div>
    
    <b-row>
      <b-button @click="showScan = true">
        Scan
      </b-button>
    </b-row>

    <b-row>
      <StreamBarcodeReader 
        @decode="onDecode"
        @loaded="onLoaded"
        v-if="showScan"
      />
    </b-row>

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
import {StreamBarcodeReader} from "vue-barcode-reader";
import { ADD_FOOD, GET_FOOD, DELETE_FOOD } from "../api/endpoints";

import { mapActions, mapGetters } from "vuex";
import { axiosInstance } from "@/api/axios";
import callToServer from "@/mixin/callToServer";

export default {
  name: "RootComponent",
  components: {
    "the-image": TheImage,
    "the-quick-search-filters": TheQuickSearchFilters,
    StreamBarcodeReader
  },
  mixins: [callToServer],
  data() {
    return {
      showForm: false,
      showScan:false,
      showMenuCard:false,
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
    onDecode(valueDecoded){
      console.log("value decoded")
      console.log(valueDecoded);
      const restCode = valueDecoded.split('**')[0];
      console.log(restCode)
      // QR Code which i made has data like this
      // resturantid**tableid**waiterid**discountid
      // abcd**.**.**123

      // load a dialog with all menu items which are available at that time in qr code
      this.$data.showScan = false;
      this.$data.showMenuCard = true;
    }
  },
  computed: {
    ...mapGetters("food", ["getFood"]),
  },
};
</script>
<style scoped>
  .bringFront{
    z-index: 999;
    width: 300px;
    height: 300px;
  }


</style>
