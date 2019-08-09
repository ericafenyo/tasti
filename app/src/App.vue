<template>
  <div id="app">
    <Register @submit="handleSubmit" />
  </div>
</template>

<script>
import Register from "./view/Register";

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
