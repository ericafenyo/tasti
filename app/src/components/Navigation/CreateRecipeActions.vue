<template>
  <div class="title-bar__actions">
    <div class="mr-8">
      <Button class="title-bar__actions-view-list" text="Next" />
      <Button class="title-bar__actions-view-grid" text="Next" />
      <Button class="title-bar__actions-view-grid" text="Save" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class CreateRecipeActions extends Vue {
  newRecipe() {
    this.$router.push({ name: "create-recipe" });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.title-bar__actions {
  display: inline-flex;

  &-sort {
    display: inline-flex;
    cursor: pointer;
    height: 36px;
    align-items: center;
    margin-right: 2rem;

    &-text {
      margin-left: 0.75rem;
    }
  }

  &-view-list,
  &-view-grid {
    background-color: transparent;
    height: 36px;
    width: 36px;
    border: none;
  }

  &-add-recipe {
    height: 36px;
    width: 36px;
    line-height: 36px;
    text-align: center;
    border: none;
    background-color: $green;
    color: var(--white);
    border-radius: 2px;
  }
}
</style>