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
      </div>
      <div class="flex items-center justify-end mt-4">
        <div>
          <a class="active recipe-item__action inline-flex items-center mr-3">
            <IconButton @click.native="setLike" :isActive="active" icon="like" class="mr-1" />
            <span class="caption">254</span>
          </a>
          <a class="recipe-item__action inline-flex items-center">
            <IconButton icon="message" />
            <span class="caption">3k</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IconButton from "@/components/IconButton.vue";
import { Actions } from "../../store/actions";
import { Result } from "../../data/Result";
import { HttpStatus } from "../../enums";

@Component({
  components: {
    IconButton
  },
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
  active: boolean = false;
  @Prop({ type: String, default: "" })
  readonly image!: string;

  @Prop({ type: String, default: "" })
  readonly name!: string;

  @Prop({ type: String, default: "" })
  readonly description!: string;

  @Prop({ type: String, default: "" })
  readonly id!: string;

  setLike() {
    if (!this.active) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  async addLike() {
    const response: Result = await this.$store.dispatch(
      Actions.LIKE_RECIPE,
      this.id
    );
    if (response.status === HttpStatus.CREATED) {
      this.active = true;
    } else {
      console.error(response);
    }
  }

  async removeLike() {
    const response: Result = await this.$store.dispatch(
      Actions.DISLIKE_RECIPE,
      this.id
    );
    if (response.status === HttpStatus.OK) {
      this.active = false;
    } else {
      console.error(response);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.recipe-item {
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);
  padding: 0.5rem;

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

  &__action {
    cursor: pointer;

    .icon {
      color: var(--icon-active);
    }

    &.active .icon {
      color: #ed64a6;
    }

    &:hover {
      .icon {
        color: #ed64a6;
      }
    }
  }
}
</style>
