<template>
  <section>
    <TitleBar title="New Recipe">
      <ButtonGroup>
        <Button
          :disabled="isFirstPage"
          :rounded="false"
          :text="$t('previous')"
          type="subtle"
          size="small"
          @on-click="onPrevious"
        />
        <Button
          v-if="!isLastPage"
          :rounded="false"
          :disabled="isLastPage"
          :text="$t('next')"
          size="small"
          @on-click="onNext"
        />
        <Button
          v-if="isLastPage"
          :rounded="false"
          :disabled="!isLastPage ||$v.invalid"
          :loading="isLoading"
          :text="$t('save')"
          type="confirm"
          size="small"
          @on-click="onSubmit"
        />
      </ButtonGroup>
    </TitleBar>
    <div class="wrapper">
      <div class="create-recipe">
        <div class="card-composite">
          <div class="inline-flex items-center mb-4">
            <span class="sub-title">Recipe information</span>
          </div>
          <form @submit.prevent>
            <div class="create-recipe-content">
              <keep-alive>
                <component :is="component" v-model="data[fields[currentPage]]" />
              </keep-alive>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { RecipeRequest } from "../../data/recipe/recipe.model";
import CreateRecipeActions from "@/components/Navigation/CreateRecipeActions.vue";
import autosize from "autosize";

import InfoComposite from "./InfoComposite.vue";
import PhotosComposite from "./PhotosComposite.vue";
import IngredientComposite from "./IngredientComposite.vue";
import DirectionComposite from "./DirectionComposite.vue";
import IconButton from "@/components/IconButton.vue";
import { Actions } from "../../store/actions";
import { Validations } from "vuelidate-property-decorators";
import { required } from "vuelidate/lib/validators";
import { log } from "util";

type ItemKey = "ingredient" | "direction";

@Component({
  components: {
    InfoComposite,
    PhotosComposite,
    IngredientComposite,
    DirectionComposite,
    IconButton,
    CreateRecipeActions
  }
})
export default class CreateRecipe extends Vue {
  currentPage: number = 0;
  isLoading: boolean = false;
  fields: string[] = ["info", "photos", "ingredients", "directions"];
  titles: string[] = [
    "Basic information",
    "Photos",
    "Ingredients",
    "Directions"
  ];

  components: string[] = [
    "InfoComposite",
    "PhotosComposite",
    "IngredientComposite",
    "DirectionComposite"
  ];

  data: RecipeRequest = {
    info: {
      name: "",
      image: undefined
    },
    photos: [],
    ingredients: [],
    directions: []
  };

  @Validations()
  validations = {
    data: {
      info: {
        name: { required },
        image: { required }
      }
    }
  };

  get component(): string {
    return this.components[this.currentPage];
  }

  get isLastPage(): boolean {
    return this.currentPage === this.fields.length - 1;
  }

  get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  onPrevious() {
    const { currentPage } = this;
    if (currentPage > 0) {
      this.currentPage = currentPage - 1;
    }
  }

  onNext() {
    const { currentPage, fields } = this;
    if (currentPage < fields.length - 1) {
      this.currentPage = currentPage + 1;
    }
  }

  onSubmit() {
    this.isLoading = true;
    const {
      info: { image, ...infoWithoutImage },
      photos,
      ingredients,
      directions
    } = this.data;

    const formData = new FormData();
    formData.append("image", image);
    photos.forEach(value => {
      formData.append("photos", value);
    });

    const inputData = {
      ...infoWithoutImage,
      ingredients: ingredients.filter(ingredient => !!ingredient),
      directions: directions.filter(direction => !!direction)
    };
    this.$store.dispatch(Actions.CREATE_RECIPE, {
      files: formData,
      inputData
    });
    this.isLoading = false;
    this.$router.replace({ name: "explore" });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.wrapper {
  padding: 4rem 0;
  height: 100%;
}
.card-composite {
  background-color: $white;
  min-height: 640px;
  padding: 2rem 2.5rem;
  border-radius: 12px;
}

.create-recipe {
  max-width: 760px;
  margin: 0 auto;
  min-height: 680px;

  &-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
}

.editable-item {
  position: relative;
  padding: 16px 4px;
  border-radius: 2px;

  &-actions {
    cursor: pointer;
    display: none;
    position: absolute;
    right: 0;
    top: 50%;

    transform: translateY(-50%);
  }

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);

    .editable-item-actions {
      display: block;
    }
  }
}

.editable {
  cursor: pointer;
}

.editor {
  background: rgba(9, 30, 66, 0.04);
  border-color: rgba(9, 30, 66, 0.13);
  box-shadow: inset 0 0 0 1px rgba(9, 30, 66, 0.13);
  margin-bottom: 4px;
  width: 100%;
  resize: none;
  border-radius: 4px;
  padding: 8px 12px;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
}

.add-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
  border: 1px dashed #a0aec0;
  color: #4a5568;
  font-weight: 500;
  padding: 8px;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
}

.sub-title {
  font-family: $poppins;
  font-size: 1rem;
  font-weight: 500;
  color: #1e1f20;
}
</style>
