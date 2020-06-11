<template>
  <ul>
    <li v-for="recipe in recipes" :key="recipe.id">
      <router-link>
        <RecipeItem v-bind="recipe" />
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import RecipeItem from "./Item.vue";

@Component({ components: { RecipeItem } })
export default class RecipeList extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly recipes!: object;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>