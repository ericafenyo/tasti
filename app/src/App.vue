<template>
  <div id="app">
    <UserProfile />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserProfile from "./view/UserProfile/UserProfile.vue";

@Component({
  components: {
    UserProfile
  }
})
export default class App extends Vue {}
</script>