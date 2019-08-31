<template>
  <div class="edit-ingredient">
    <v-input label="Write Ingredient" value="220 CC water" />
    <ul class="ingredient-list">
      <li class="ingredient-list-item">
        <span>1 heap of Ocean Bloom</span>
        <icon-edit />
      </li>

      <li class="ingredient-list-item">
        <span>3 batches of Water Cudweed</span>
        <icon-edit />
      </li>
    </ul>
    <v-button label="Save Ingredients" type="primary" @on-click="handleClick" />
  </div>
</template>

<script>
import Input from "./Input";
import IconEdit from "../assets/icons/edit.svg";
import Button from "./Button";
export default {
  components: {
    "v-input": Input,
    "icon-edit": IconEdit,
    "v-button": Button
  },

  methods: {
    handleClick() {
      console.log("clicked");
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-ingredient {
  .ingredient-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 12px 0;

      span {
        @include body;
      }
    }
  }
}
</style>