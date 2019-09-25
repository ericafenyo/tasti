<template>
  <div class="cookbook p-3">
    <div class="cookbook-thumbnail-wrapper">
      <div class="cookbook-thumbnail">
        <div class="cookbook-thumbnail-item col-6 p-0 mr-1 bg-red"></div>
        <div class="cookbook-thumbnail-item col-6 p-0">
          <div class="mb-1 bg-red"></div>
          <div class="bg-red"></div>
        </div>
      </div>
    </div>
    <Subhead :text="cookbook.name" class="mt-3" />
    <v-text class="my-2" :text="`${cookbook.recipeCount} recipes`" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Subhead from "../Subhead/Subhead.vue";

interface CookbookItem {
  imageUrl: String;
  name: String;
  recipeCount: Number;
}

/**
 *  FIXME: Docs
 */
@Component({ components: { Subhead } })
export default class Cookbook extends Vue {
  @Prop({ type: Object, default: "" }) readonly cookbook!: CookbookItem;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.cookbook {
  background: $white;
  &-thumbnail-wrapper {
    position: relative;
    height: 0;
    padding-top: 66.66%;

    .cookbook-thumbnail {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;

      &-item {
      }

      &-item:last-child {
        display: flex;
        flex-direction: column;

        div {
          flex: 1;
        }
      }
    }
  }

  &-label {
  }

  .bg-red {
    background-color: #45515e;
  }
}
</style>