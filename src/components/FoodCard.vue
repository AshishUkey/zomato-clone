<template>
    <b-card
        title="Food Item"
        :img-src="getImage"
        img-alt="Idly"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
      <b-card-text>
        <div class="col-item2">
              {{food._id}}
              <h3>{{ getName }}</h3>
              <p>{{ getCuisine }}</p>
          </div>
      </b-card-text>


      <h3>Available food categories</h3>
    <ul>
      <li v-for="(item,index) in getFoodCategories" :key="index">
        {{JSON.stringify(item)}}
      </li>
    </ul>
      <b-button href="#" variant="primary" @click="deleteAction">Delete</b-button>
    </b-card> 
</template>
<script>

import { mapGetters } from 'vuex';

export default {
  props: {'food':{
    required:true,
  }},
  emits:['handle-delete'],
  computed:{
    ...mapGetters('food',['getFoodCategories']),
    getName(){
      return this.$props.food?.name ? this.$props.food.name:'-'
    },
    getCuisine(){
      return this.$props.food?.cuisine ? this.$props.food.cuisine:'-'
    },
    getImage(){
      return 'https://github.com/DivyashantKumar/staticWebPageCollection/blob/main/images/1image.png?raw=true'
    },
  },
  methods:{
    deleteAction(){
      const deleteId = this.$props.food?._id ? this.$props.food._id:0;
      console.log(deleteId)
      this.$emit('handle-delete',deleteId);
    }
  }
};
</script>

<style scoped>
  .card{
    width:400px;
    float: left;
    border: solid 1px #ccc;
  }
</style>