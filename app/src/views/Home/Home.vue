<template>
  <div class="recipes">
    <NavigationBar class="header-fix" />
    <Portal v-if="isModelOpen" to="notification-outlet">
      <CreateRecipeTemplate @on-close="enableModelVisibility(false)" />
    </Portal>
    <div>
      <!-- <button @click="enableModelVisibility">Add</button> -->
    </div>
    <div class="card cursor-pointer" v-for="recipe in recipes" :key="recipe.id">
      <!-- <div class="card-header">
        <div class="flex">
          <Avatar :style="{width: '20px', height: '20px'}" :src="src" />
          <div :style="{marginLeft: '12px'}">
            <strong class="card-header-overline">Warren Briggs</strong>
          </div>
        </div>
      </div>-->
      <div class="card-body">
        <picture>
          <img class="card-media" :src="recipe.image" alt="Recipe thumbnail" />
        </picture>
        <h2 class="card-body-title" v-text="recipe.name" />
      </div>

      <!-- <div class="card-footer">
        <div class="flex pt-3">
          <div class="flex items-center mr-3" :style="{fontSize: '14px',  color: '#3f3356'}">
            <Icon class="p-1" name="like" width="18" height="18" />
            <span>12</span>
          </div>
          <div class="flex items-center" :style="{fontSize: '14px',  color: '#3f3356'}">
            <Icon name="message" class="p-1" width="18" height="18" />
            <span>12</span>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Actions } from "../../store/actions";
import { RecipeUiModel } from "../../data/recipe/recipe.model";
import CreateRecipeTemplate from "../../components/CreateRecipeTemplate.vue";
import NavigationBar from '../../components/NavigationBar/NavigationBar.vue'

@Component({ components: { CreateRecipeTemplate, NavigationBar } })
export default class Home extends Vue {
  src =
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80";
  recipes: RecipeUiModel[] = [];
  showDialog = false;

  isModelOpen = false;
  enableModelVisibility(bool = true) {
    this.isModelOpen = bool;
  }

  isLoading = true;
  enableLoading(bool) {
    this.isLoading = bool;
  }

  showAddRecipe() {
    this.showDialog = true;
  }

  async mounted() {
    try {
      const response = await this.$store.dispatch(Actions.GET_RECIPES);
      this.enableLoading(false);
      this.recipes = response;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/_resources.scss";

@function columnCount($count, $padding: 16) {
  $width: #{$count * $padding * 2}px;
  @return calc((100% - #{$width}) / #{$count});
}

.recipes {
  display: flex;
  flex-wrap: wrap;
  max-width: 1328px;
  margin: 0 auto;
}

.card {
  border-radius: 6px;
  margin: 1rem;
  flex-basis: columnCount(3, 16);

  &-header {
    margin-bottom: 1rem;

    &-overline {
      display: block;
      @include subtitle-small;
    }

    &-caption {
      @include caption;
      display: inline-flex;
    }
  }

  &-body {
    &-title {
      @include subtitle;
      padding-top: 1rem;
      padding-bottom: 0.5rem;
    }
  }

  &-media {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);
    width: 100%;
    height: 100%;
  }
}
</style>