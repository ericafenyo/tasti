<template>
  <div id="app">
    <Register />
  </div>
</template>

<script>
import Register from "./view/Register/Register";

export default {
  components: {
    Register
  },
  methods: {
    handleSubmit(user) {
      console.log(user);
    }
  }
};
</script>


