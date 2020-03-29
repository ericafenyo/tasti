<template>
  <section class="create-recipe">
    <div class="container">
      <form @submit.prevent>
        <div class="create-recipe-content">
          <Stepper>
            <template #header>
              <Step :currentStep="currentPage" :maxStep="4"></Step>
            </template>
            <template #content>
              <InfoComposite v-model="data.info" v-show="currentPage == 0" />
              <PhotosComposite v-model="data.photos" v-show="currentPage == 1" />
              <IngredientComposite v-model="data.ingredients" v-show="currentPage == 2" />
              <DirectionComposite v-model="data.directions" v-show="currentPage == 3" />
            </template>
          </Stepper>
          <div class="create-recipe-actions">
            <Button size="small" text="Previous" @on-click="onPrevious" />
            <Button v-if="currentPage != 3" size="small" text="Continue" @on-click="onNext" />
            <Button v-if="currentPage === 3" size="small" text="Save" @click.native="onSubmit" />
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { RecipeRequest } from "../../data/recipe/recipe.model";
import autosize from "autosize";

import IngredientComposite from "./IngredientComposite.vue";
import DirectionComposite from "./DirectionComposite.vue";
import InfoComposite from "./InfoComposite.vue";
import PhotosComposite from "./PhotosComposite.vue";
import Stepper from "@/components/Stepper/Stepper.vue";
import StepperItem from "@/components/Stepper/StepperItem.vue";
import Step from "@/components/Stepper/Step.vue";
import { Action } from "rxjs/internal/scheduler/Action";
import { Actions } from "../../store/actions";

type ItemKey = "ingredient" | "direction";

@Component({
  components: {
    InfoComposite,
    PhotosComposite,
    IngredientComposite,
    DirectionComposite,
    Stepper,
    Step,
    StepperItem
  }
})
export default class CreateRecipe extends Vue {
  currentPage = 0;

  data: RecipeRequest = {
    info: {},
    photos: [],
    ingredients: [],
    directions: []
  };

  onPrevious() {
    const { currentPage } = this;
    if (currentPage > 0) {
      this.currentPage = currentPage - 1;
    }
  }
  onNext() {
    const { currentPage } = this;
    if (currentPage < 3) {
      this.currentPage = currentPage + 1;
    }
  }

  onSubmit() {
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
      ingredients,
      directions
    };
    this.$store.dispatch(Actions.CREATE_RECIPE, { files: formData, inputData });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.create-recipe {
  max-width: 760px;
  margin: 0 auto;

  &-content {
    padding: 48px 0;
  }

  &-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
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
</style>