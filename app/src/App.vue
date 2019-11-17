<template>
  <div id="app">
    <Toolbar />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Register from "./views/Register/Register.vue";
import Toolbar from "./components/Toolbar/Toolbar.vue";
import Input from "./components/Input/Input.vue";

@Component({
  components: {
    Input,
    Toolbar,
    Register
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.element-test {
  display: flex;
  margin: 48px;

  :first-child {
    width: 480px;
  }
}
</style>
