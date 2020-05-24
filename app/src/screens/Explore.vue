<template>
  <div>
    <TitleBar title="Explore">
      <ExplorerActions />
    </TitleBar>
    <v-container fluid>
      <v-row tag="ul">
        <v-col
          class="col-5"
          :cols="12"
          :sm="6"
          :md="3"
          tag="li"
          v-for="recipe in recipes"
          :key="recipe.id"
        >
          <RecipeItem
            :id="recipe.id"
            :image="recipe.imagePath"
            :name="recipe.name"
            :description="recipe.description"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import ExplorerActions from "@/components/Navigation/ExplorerActions.vue";
import RecipeItem from "@/screens/Recipe/RecipeItem.vue";
import { Actions } from "../store/actions";
import { Result } from "../data/Result";
import { HttpStatus } from "../enums";

@Component({ components: { ExplorerActions, RecipeItem } })
export default class Explore extends Vue {
  recipes: any[] = [];

  async mounted() {
    const response: Result = await this.$store.dispatch(Actions.GET_RECIPES);
    if (response.status == HttpStatus.OK) {
      this.recipes = response.data;
    }

    console.log(response);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.recipe-list {
  display: flex;
}
</style>