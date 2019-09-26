<template>
  <div id="app">
    <Recipe />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserProfile from "./view/UserProfile/UserProfile.vue";
import Recipe from './components/Recipe/Recipe.vue'

@Component({
  components: {
    UserProfile,
    Recipe
  }
})
export default class App extends Vue {}
</script>