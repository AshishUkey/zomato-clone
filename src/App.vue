<template>
  <main>
    <navigation-comp/>
    <router-view></router-view>
  </main>
</template>
<script>
  import NavigationComp from "./components/NavigationComp.vue"
export default {
  components:{
    'navigation-comp':NavigationComp
  },
  name: "App",
};
</script>

