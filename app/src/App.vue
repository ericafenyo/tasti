<template>
  <div id="app">
    <Toolbar />
    <Register />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Register from "./view/Register/Register.vue";
import Toolbar from "./components/Toolbar/Toolbar.vue";

@Component({
  components: {
    Register,
    Toolbar
  }
})
export default class App extends Vue {}
</script>
