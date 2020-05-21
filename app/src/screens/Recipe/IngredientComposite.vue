<template>
  <div @submit.prevent class="ingredients">
    <ul class="ingredients--list">
      <li
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="ingredients--list-item flex"
      >
        <div class="flex items-center flex-1">
          <div class="ingredients--list-item-point mr-3" />
          <input
            :ref="`ingredient`"
            placeholder="100g flour"
            v-model="ingredients[index]"
            class="ingredients--list-item-text flex-1"
            @keyup.enter="addIngredientPlaceHolder(index)"
          />
        </div>
        <div
          @click.prevent="removeItem(index, 'ingredient')"
          class="ingredients--list-item-actions"
        >
          <Icon class="ingredients--list-item-actions-close" name="close" />
        </div>
      </li>
    </ul>
    <div mt-4>
      <div>
        <div class="add-item" @click.prevent="addIngredientPlaceHolder(ingredients.length - 1)">
          <Icon class="mr-2" name="add" />
          <span>Add Ingredient</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class IngredientComposite extends Vue {
  ingredients: string[] = [""];
  $refs!: {
    ingredient: HTMLInputElement[];
  };

  addIngredientPlaceHolder(index: number) {
    this.ingredients.splice(index + 1, 0, "");
    this.$nextTick(() => {
      const inputElement = this.$refs.ingredient[index + 1];
      if (inputElement) {
        inputElement.focus();
      }
    });
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  @Watch("ingredients", { immediate: true })
  onIngredientsChanged(value: string[]) {
    this.$emit("input", value);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.ingredients {
  &--list-item {
    background-color: var(--white);
    position: relative;
    padding: 0.5rem 0.75rem;
    margin: 0.25rem 0;
    border: none;
    transition: all 0.2s linear;

    &-point {
      width: 20px;
      height: 20px;
      border: 2px solid $grey;
      border-radius: 50%;
    }

    &-text {
      border: none;
      background-color: transparent;
    }

    &-actions {
      // display: none;
      color: $grey;

      &-close {
        cursor: pointer;
        padding: 8px;
      }
    }

    &:hover {
      background-color: rgba($color-surface, 0.5);

      .ingredients--list-item-actions {
        display: block;
      }
    }
  }

  .editable {
    cursor: pointer;
  }

  .editor {
    background: rgba($color-surface, 0.5);
    margin-bottom: 4px;
    padding: 0.5rem 0.75rem;
    width: 100%;
    border: none;
    border-radius: 2px;
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
  }
}
</style>