<template>
  <FormModule title="Ingredient">
    <div>
      <div
        v-for="(ingredient, index) in ingredients"
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
        <div @click.prevent="removeItem(index, 'ingredient')" class="editable-item-actions">
          <Icon name="delete" />
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div :class="{'hidden': (editorEnabled)}">
        <div class="add-item" @click.prevent="enableEditor()">
          <Icon color="red" class="mr-2" name="add" />
          <span>Add Ingredient</span>
        </div>
      </div>
      <div :class="{'hidden': (!editorEnabled)}">
        <textarea v-model="ingredient" class="editor mb-2"></textarea>
        <div class="editor-controls">
          <Button class="mr-2" @on-click="saveItem('ingredient')" text="Save" size="small" />
          <Button @on-click="enableEditor(false)" text="Cancel" size="small" type="text" />
        </div>
      </div>
    </div>
  </FormModule>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import autosize from "autosize";

import FormModule from "./FormModule.vue";

import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button/Button.vue";
import Icon from "@/components/Icons/Icon.vue";

@Component({
  components: {
    FormModule,
    Checkbox,
    Button,
    Icon
  }
})
export default class IngredientFormModule extends Vue {
  ingredient: string = "";
  ingredients: string[] = ["Okra"];

  editorEnabled: boolean = false;

  saveItem() {
    const { ingredient } = this;

    if (!ingredient) {
      return;
    }

    this.ingredients.push(ingredient);
    this.ingredient = "";
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  enableEditor(enable: boolean = true) {
    this.ingredient = "";
    this.editorEnabled = enable;
  }

  @Watch("ingredients", { immediate: true })
  onIngredientsChanged(value: string[]) {
    this.$emit("on-input", { name: "ingredients", value });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
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