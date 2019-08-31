<template>
  <div id="app">
    <UserProfile />
  </div>
</template>

<script>
import Register from "./view/Register";
import UserProfile from "./view/UserProfile";

export default {
  components: {
    UserProfile
  },
  methods: {
    handleSubmit(user) {
      console.log(user);
    }
  }
};
</script>


