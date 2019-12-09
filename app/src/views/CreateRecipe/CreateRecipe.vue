<template>
  <section class="create-recipe pt-24 pb-24">
    <div class="form-frame">
      <form @submit.prevent="onSubmit">
        <div class="form-module">
          <div class="container">
            <fieldset>
              <div class="flex">
                <PhotoPicker
                  @image-changed="(file) => {data.thumbnail = file}"
                  class="flex-shrink-0"
                  :style="{width: '100px', height: '100px'}"
                />
                <Input
                  class="self-end ml-3 w-full"
                  type="text"
                  label="Recipe Name"
                  name="name"
                  :hasHint="false"
                  @on-input="onInput"
                />
              </div>
            </fieldset>
          </div>
        </div>

        <div class="form-module">
          <div class="container">
            <fieldset>
              <legend class="header-2">Gallery</legend>
              <div class="photo-picker-list -mx-2">
                <div class="photo-picker-item p-2" v-for="(item, index) in 4" :key="index">
                  <div class="ar-1-1">
                    <PhotoPicker
                      @image-changed="(file) => {data.gallery[index] = file}"
                      class="ar-content"
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <IngredientFormModule @on-input="onInput" />
        <DirectionFormModule @on-input="onInput" />
        <RecipeInfoFormModule @on-input="onInput" />

        <div class="flex">
          <Button text="Save" />
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { RecipeRequestModel } from "../../data/recipe/recipe.model";
import autosize from "autosize";

import IngredientFormModule from "./IngredientFormModule.vue";
import DirectionFormModule from "./DirectionFormModule.vue";
import RecipeInfoFormModule from "./RecipeInfoFormModule.vue";

import PhotoPicker from "@/components/PhotoElements/PhotoPicker/PhotoPicker.vue";
import Headline from "@/components/Headline/Headline.vue";
import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button/Button.vue";
import Input from "@/components/Input/Input.vue";
import Icon from "@/components/Icons/Icon.vue";

type ItemKey = "ingredient" | "direction";

@Component({
  components: {
    Headline,
    PhotoPicker,
    Input,
    Checkbox,
    Button,
    Icon,
    IngredientFormModule,
    DirectionFormModule,
    RecipeInfoFormModule
  }
})
export default class CreateRecipe extends Vue {
  data: RecipeRequestModel = {
    name: "",
    thumbnail: null,
    gallery: [],
    ingredients: [],
    directions: [],
    info: {
      serving: "",
      tags: "",
      facts: ""
    }
  };

  onInput({ value, name }) {
    this.data[name] = value;
  }

  onSubmit() {}

  mounted() {
    autosize(document.querySelectorAll("textarea"));
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.create-recipe {
  width: 100%;
  background-color: $color-surface;
}

.editable-item {
  position: relative;
  padding: 8px 4px;
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

.photo-picker-list {
  display: flex;
  flex-wrap: wrap;
  .photo-picker-item {
    flex-basis: 25%;
  }
}
</style>