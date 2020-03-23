<template>
  <form @submit.prevent class="ingredient">
    <ul>
      <li v-for="(ingredient, index) in ingredients" :key="index" class="editable-item editable">
        <div class="flex">
          <div class="editable-item-checkbox mr-3">
            <Checkbox />
          </div>
          <div class="flex-1">
            <div class="editable-item-content">
              <div contenteditable>{{ingredient}}</div>
            </div>
          </div>
        </div>
        <div @click.prevent="removeItem(index, 'ingredient')" class="editable-item-actions">
          <Icon name="delete" />
        </div>
      </li>
    </ul>
    <div class="mt-3">
      <div :class="{'hidden': (editorEnabled)}">
        <div class="add-item" @click.prevent="enableEditor()">
          <Icon class="mr-2" name="add" />
          <span>Add Ingredient</span>
        </div>
      </div>
      <div :class="{'hidden': (!editorEnabled)}">
        <input v-model="ingredient" class="editor mb-2" @keyup.enter="saveItem('ingredient')" />
        <div class="editor-controls">
          <!-- <Button class="mr-2" @on-click="saveItem('ingredient')" text="Save" size="small" /> -->
          <!-- <Button @on-click="enableEditor(false)" text="Cancel" size="small" type="text" /> -->
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import Checkbox from "@/components/Checkbox.vue";
import autosize from "autosize";

@Component({ components: { Checkbox } })
export default class IngredientComposite extends Vue {
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
    this.$emit("input", value);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.editable-item {
  background-color: $white;
  position: relative;
  padding: 0.75rem 0.25rem;
  margin: 0.25rem 0;
  border: none;

  &-actions {
    cursor: pointer;
    display: none;
    position: absolute;
    right: 0;
    top: 50%;

    transform: translateY(-50%);
  }

  &:hover {
    background-color: rgb(245, 247, 249);

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
  margin-bottom: 4px;
  width: 100%;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
}

.add-item {
  color: blue;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4a5568;
  font-weight: 400;
  padding: 8px;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
}
</style>