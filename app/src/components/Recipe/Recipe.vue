<template>
  <div class="recipe">
    <div class="recipe-thumbnail">
      <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?fit=crop&w=800" alt="recipe-thumbnail">
    </div>
    <div class="recipe-body">
      <Subhead text = "Some subheading" />
      <div class="recipe-footer">
        <div class="recipe-footer-stats">
          <IconAlarm />
          <span class>Description</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Paragraph from "../Paragraph/Paragraph.vue";
import IconAlarm from "@/assets/icons/alarm.svg";

interface RecipeItem {
  name: String;
  imageUrl: String;
  servingTime: String;
  ingredientCount: String;
  likes: String;
}

@Component({ components: { IconAlarm, Paragraph } })
export default class Recipe extends Vue {
  @Prop({ type: Object, default: {} }) recipe!: RecipeItem;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.recipe {
  &-footer {
    &-stats {
    }
  }
}
</style>