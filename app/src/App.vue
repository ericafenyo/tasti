<template>
  <div id="app">
    <UserProfile />
  </div>
</template>

<script>
import Register from "./view/Register/Register";
import UserProfile from "./view/UserProfile/UserProfile";

export default {
  components: {
    Register,
    UserProfile
  },
  methods: {
    handleSubmit(user) {
      console.log(user);
    }
  }
};
</script>


