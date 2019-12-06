<template>
  <section class="create-recipe pt-24 pb-24">
    <div class="form-frame">
      <form @submit.prevent="onSubmit">
        <div class="form-module">
          <div class="container">
            <fieldset>
              <div class="flex">
                <PhotoPicker class="flex-shrink-0" :style="{width: '100px', height: '100px'}" />
                <Input
                  class="self-end ml-3 w-full"
                  type="text"
                  label="Recipe Name"
                  :hasHint="false"
                />
              </div>
            </fieldset>
          </div>
        </div>

        <!-- <div class="form-module">
          <div class="container">
            <fieldset>
              <legend class="header-2">Gallery</legend>
              <div class="form-field"></div>
            </fieldset>
          </div>
        </div>-->

        <div class="form-module mb-4">
          <div class="container">
            <fieldset>
              <legend class="header-2">Ingredients</legend>
              <div>
                <div
                  v-for="(ingredient, index) in data.ingredient.value"
                  :key="index"
                  class="editable-item editable mb-1"
                >
                  <div class="flex">
                    <div class="editable-item-checkbox mr-3">
                      <Checkbox />
                    </div>
                    <div class="flex-1">
                      <div class="editable-item-content">
                        <p>{{ingredient}}</p>
                      </div>
                      <!-- <div :class="{'hidden': (!editorEnabled)}">
                      <textarea class="editor mb-2" ></textarea>
                      <div class="editor-controls">
                        <Button text="Save" size="small" />
                        <Button @on-click="disableEditor" text="Cancel" size="small" type="text" />
                      </div>
                      </div>-->
                    </div>
                  </div>
                  <div
                    @click.prevent="removeItem(index, 'ingredient')"
                    class="editable-item-actions"
                  >
                    <Icon name="delete" />
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <div :class="{'hidden': (editorEnabled)}">
                  <div class="add-item" @click.prevent="enableEditor(1)">
                    <Icon color="red" class="mr-2" name="add" />
                    <span>Add Ingredient</span>
                  </div>
                </div>
                <div :class="{'hidden': (!editorEnabled && activeEditor != 1)}">
                  <textarea v-model="data.ingredient.model" class="editor mb-2"></textarea>
                  <div class="editor-controls">
                    <Button
                      class="mr-2"
                      @on-click="saveItem('ingredient')"
                      text="Save"
                      size="small"
                    />
                    <Button @on-click="disableEditor" text="Cancel" size="small" type="text" />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="form-module">
          <div class="container">
            <fieldset class="form-module-title">
              <legend class="header-2">How to Cook</legend>
              <div>
                <div
                  v-for="(direction, index) in data.direction.value"
                  :key="index"
                  class="editable-item editable mb-1"
                >
                  <div class="flex">
                    <div class="editable-item-checkbox mr-3">
                      <Checkbox />
                    </div>
                    <div class="flex-1">
                      <div class="editable-item-content">
                        <p>{{direction}}</p>
                      </div>
                      <!-- <div :class="{'hidden': (!editorEnabled)}">
                      <textarea class="editor mb-2" ></textarea>
                      <div class="editor-controls">
                        <Button text="Save" size="small" />
                        <Button @on-click="disableEditor" text="Cancel" size="small" type="text" />
                      </div>
                      </div>-->
                    </div>
                  </div>
                  <div
                    @click.prevent="removeItem(index, 'direction')"
                    class="editable-item-actions"
                  >
                    <Icon name="delete" />
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <div :class="{'hidden': (editorEnabled)}">
                  <div class="add-item" @click.prevent="enableEditor(2)">
                    <Icon color="red" class="mr-2" name="add" />
                    <span>Add Directions</span>
                  </div>
                </div>
                <div :class="{'hidden': (!editorEnabled && activeEditor != 2)}">
                  <textarea v-model="data.direction.model" class="editor mb-2"></textarea>
                  <div class="editor-controls">
                    <Button
                      class="mr-2"
                      @on-click="saveItem('direction')"
                      text="Save"
                      size="small"
                    />
                    <Button @on-click="disableEditor" text="Cancel" size="small" type="text" />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <!-- <div class="form-module">
          <div class="container">
            <fieldset>
              <legend class="header-2">Additional Info</legend>
              <div></div>
            </fieldset>
          </div>
        </div>-->
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

import Headline from "@/components/Headline/Headline.vue";
import PhotoPicker from "../components/PhotoElements/PhotoPicker/PhotoPicker.vue";
import Input from "@/components/Input/Input.vue";
import Checkbox from "../components/Checkbox.vue";
import autosize from "autosize";
import Button from "@/components/Button/Button.vue";
import Icon from "../components/Icons/Icon.vue";

type ItemKey = "ingredient" | "direction";
type RecipeModel = {
  [key: string]: {
    model: string;
    value: string[];
  };
};

@Component({
  components: {
    Headline,
    PhotoPicker,
    Input,
    Checkbox,
    Button,
    Icon
  }
})
export default class CreateRecipe extends Vue {
  data: RecipeModel = {
    ingredient: {
      model: "",
      value: ["Okra"]
    },
    direction: {
      model: "",
      value: ["You suck at cooking"]
    }
  };

  editorEnabled: boolean = false;
  activeEditor: number = -1;

  onSubmit() {}
  onInput() {}

  enableEditor( editorIndex?: number, enable: boolean = true, ) {
    this.activeEditor = editorIndex;
    this.editorEnabled = enable;
  }

  removeItem(index: number, key: ItemKey) {
    this.data[key].value.splice(index, 1);
  }

  saveItem(key: ItemKey) {
    const { model, value } = this.data[key];
    console.log(model);
    console.log(value);

    if (!model) {
      return;
    }

    this.data[key].value.push(model);
    this.data[key].model = "";
  }

  disableEditor() {
    console.log("qfsg");

    this.editorEnabled = false;
  }

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
</style>