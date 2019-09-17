<template>
  <div id="app">
    <UserProfile />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Register from "./view/UserProfile/UserProfile.vue";

@Component({
  components: {
    Register
  }
})
export default class App extends Vue {}
</script>