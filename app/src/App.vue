<template>
  <div id="app">
    <Register />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Register from "./view/Register/Register.vue";

@Component({
  components: {
    Register
  }
})
export default class App extends Vue {}
</script>
