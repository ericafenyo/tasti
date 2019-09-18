<template>
  <div class="cookbook p-2">
    <div class="cookbook-thumbnail">
      <img class="image-fluid" :src="cookbook.imageUrl" alt="recipe thumbnail" />
    </div>
    <Subhead :text="cookbook.name" class="mt-3" />
    <v-text class="my-2" :text="`${cookbook.recipeCount} recipes`" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Subhead from "../Subhead/Subhead.vue";
import Text from "../Text/Text.vue";

interface CookbookItem {
  imageUrl: String;
  name: String;
  recipeCount: Number;
}

/**
 *  FIXME: Docs
 */
@Component({ components: { Subhead, "v-text": Text } })
export default class Cookbook extends Vue {
  @Prop({ type: Object, default: "" }) readonly cookbook!: CookbookItem;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.cookbook {
  background: $white;
  &-thumbnail {
    position: relative;
    height: 0;
    padding-top: 66.66%;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  &-label {
  }
}
</style>