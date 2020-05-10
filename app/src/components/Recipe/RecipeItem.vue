<template>
  <div class="recipe card-module">
    <div class="recipe-thumbnail">
      <img
        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?fit=crop&w=800"
        alt="recipe-thumbnail"
      />
    </div>
    <div class="recipe-body">
      <h4 class="subhead">Subhead</h4>
      <div class="recipe-footer">
        <div class="recipe-footer-stats">
          <IconAlarm />
          <span class="caption">10 min</span>
        </div>
        <div class="recipe-footer-stats">
          <IconService />
          <span class="caption">Servings</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import IconAlarm from "../../assets/icons/alarm.svg";
import IconService from "../../assets/icons/service.svg";

interface RecipeProps {
  name: String;
  imageUrl: String;
  servingTime: String;
  ingredientCount: String;
  likes: String;
}

@Component({ components: { IconAlarm, IconService } })
export default class RecipeItem extends Vue {
  @Prop({ type: Object, default: {} }) recipe!: RecipeProps;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.recipe {
  &-thumbnail {
    img {
      width: 100%;
    }
  }

  &-body {
    padding: 16px 0;
  }
  &-footer {
    margin-top: 8px;
    &-stats {
      display: inline-flex;
      align-items: center;
      &:not(:last-child) {
        margin-right: 16px;
      }
      svg {
        width: 20px;
        
      }

      span {
        margin-left: 8px;
      }
    }
  }
}
</style>