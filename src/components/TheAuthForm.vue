<template>
  <div>
    <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.username"
          placeholder="Enter Username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Cuisine:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          placeholder="Enter Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>
  
<script>
    export default {
    data() {
        return {
        form: {
            username: "",
            password: "",
        },
      
        show: true,
        };
    },
    methods: {
        onSubmit() {
          this.$emit('handle-submit',this.$data.form)
        },
    },
    };
</script>