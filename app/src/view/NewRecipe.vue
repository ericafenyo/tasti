<template>
  <div class="new-recipe">
    <div class="new-recipe-name">
      <div class="input-add-square">
        <icon-add />
      </div>
      <v-input label="Recipe Name" type="text" placeholder="Write Down Recipe Name" />
    </div>

    <div class="input-add-card">
      <div class="input-add-card-header">
        <span>Gallery</span>
        <icon-edit />
      </div>
      <div class="input-add-card-item">
        <icon-add />
        <span class="input-add-card-item-instruction">Upload Images</span>
      </div>
    </div>

    <div class="input-add-card">
      <div class="input-add-card-header">
        <span>Ingredients</span>
        <icon-edit />
      </div>
      <div class="input-add-card-item">
        <icon-add />
        <span class="input-add-card-item-instruction">Add Ingredient</span>
      </div>
    </div>

    <div class="input-add-card">
      <div class="input-add-card-header">
        <span>How to Cook</span>
        <icon-edit />
      </div>
      <div class="input-add-card-item">
        <icon-add />
        <span class="input-add-card-item-instruction">Add Directions</span>
      </div>
    </div>

    <div class="actions">
      <div class="actions-header">Save to</div>
      <div class="actions-save">
        <select name id>
          <option name="western">Western</option>
          <option name="italian">Italian</option>
          <option name="sweet">Sweet</option>
        </select>

        <button class="button button-outline">Save Recipe</button>
      </div>

      <div>
        <button class="button button-primary">Post to feed</button>
      </div>
    </div>
  </div>
</template>

<script>
import IconAdd from "../asserts/icons/add.svg";
import IconEdit from "../asserts/icons/edit.svg";
import Input from "../components/Input";
export default {
  components: {
    "icon-add": IconAdd,
    "icon-edit": IconEdit,
    "v-input": Input
  }
};
</script>

<style lang="scss" scoped>
.input-add-square {
  @include center-content;
  margin-right: 15px;

  width: 62px;
  height: 62px;
  flex-shrink: 0;
  border: 1px dashed $brown-grey;
  border-radius: 8px;
}

.new-recipe {
  font-family: $font;
  margin: 24px 16px;
  &-name {
    display: flex;
  }

  .actions {
    padding: 24px 0;

    &-header {
      @include subtle;
      color: $brownish-grey;
      margin-bottom: 16px;
    }

    &-save {
      display: flex;
      margin-bottom: 48px;

      select {
        @include card;
        padding: 0 16px;
        background-color: $white;
        border-radius: 4px;
        border: none;
        flex: 1;
        margin-right: 16px;
      }

      button {
        width: initial;
      }
    }
  }
}

.input-add-card {
  @include card;
  padding: 16px;
  margin-bottom: 24px;

  &-header {
    @include header-5;

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px dashed $brown-grey;
    border-radius: 8px;
    padding: 0 16px;

    &-instruction {
      margin-left: 16px;
      color: rgba($hunter-green, 0.5);
    }
  }
}

.button {
  padding: 0 16px;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  font-weight: bold;
  border-radius: 4px;
  color: $white;
  font-size: 1em;
}

.button-outline {
  border: 2px solid $green;
  background: $white;
  color: $green;
}

.button-primary {
  border: 2px solid $green;
  background: $green;
  color: $white;
}
</style>