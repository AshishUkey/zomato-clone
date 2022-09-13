<template>
  <b-container class="container-1">
    <b-row>
      <b-col  lg="12">
        <img :src="images?.[0]"/>
      </b-col>
    </b-row>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Overview" active>
          <b-card-text>{{
            overview
          }}
          </b-card-text>
        </b-tab>
        <b-tab title="Contact">
          <b-card-text>
            {{contact}}
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
export default {
  props: ["images","overview","contact"],
};
</script>

<style scoped>
.container-1 {
  height: 500px;
  width: 100%;
}
</style>