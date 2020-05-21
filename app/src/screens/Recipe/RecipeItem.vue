<template>
  <div class="recipe-item">
    <div>
      <v-responsive>
        <div class="recipe-item__image_wrapper">
          <img class="recipe-item__image" :src="image | buildImage" alt="recipe image" />
        </div>
      </v-responsive>

      <div>
        <Headline level="4" :text="name" class="mt-3" />
        <p class="text-body">{{description}}</p>
      </div>
      <div class="flex items-center justify-between mt-4">
        <div>
          <div class="inline-flex items-center mr-3">
            <Icon color="#718096" class="mr-1" name="like" />
            <span class="text-body">254</span>
          </div>
          <div class="inline-flex items-center">
            <Icon color="#718096" class="mr-1" name="message" />
            <span class="text-body">3k</span>
          </div>
        </div>
        <div>
          <Button size="small" :text="$t('save')" icon="add" type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  filters: {
    buildImage(imagePath: string) {
      if (!imagePath) {
        return "";
      }
      return `${process.env.VUE_APP_IMAGE_BASE_URL}${imagePath}`;
    }
  }
})
export default class RecipeItem extends Vue {
  @Prop({ type: String, default: "" })
  readonly image!: string;

  @Prop({ type: String, default: "" })
  readonly name!: string;

  @Prop({ type: String, default: "" })
  readonly description!: string;
}
</script>
<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.recipe-item {
  background-color: $white;
  border-radius: 5px;
  //
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);
  // border: solid 1px $color-border;
  padding: 1rem;

  &__author {
    display: flex;
    align-items: center;
  }

  &__image {
    width: 100%;
  }

  &__image_wrapper {
    border-radius: 2px;
    overflow: hidden;
  }

  &__name {
    @include header-3;
  }

  &__description {
    @include text-body;
  }
}
</style>
