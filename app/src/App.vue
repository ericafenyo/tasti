<template>
  <div id="app">
    <NavigationBar v-if="false" class="header-fix" />
    <router-view />
    <portal-target name="notification-outlet"></portal-target>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationBar from "./components/NavigationBar/NavigationBar.vue";

@Component({
  components: {
    NavigationBar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.header-fix {
  position: fixed;
}
</style>
