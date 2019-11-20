<template>
  <div id="app">
    <Header class="header-fix" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.header-fix {
  position: fixed;
}
</style>
