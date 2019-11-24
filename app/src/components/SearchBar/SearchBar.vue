<template>
  <div class="search-bar">
    <input class="search-bar-input" type="text" />
    <Icon width="20" name="arrow-forward" class="arrow-forward-icon" />
    <Icon width="20" name="search" class="search-icon" />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import Icon from "../Icons/Icon.vue";
@Component({ components: { Icon } })
export default class SearchBar extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.search-bar {
  position: relative;
  height: 42px;
  max-width: 650px;
  background-color: $color-surface;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.2s;

  &:focus-within {
    box-shadow: inset 0 0 0px 1px $color-border;
    background-color: $white;
  }

  &-input {
    background-color: transparent;
    box-sizing: border-box;
    font-family: $font;
    font-size: 1rem;
    color: $color-primary-text;
    border: 0;
    width: 100%;
    height: 100%;
    padding: 0 40px;
    z-index: 0;
    transition: all 0.2s;
    position: absolute;

    &.input-error {
      box-shadow: inset 0 0 0px 2px $red;
    }
  }

  .search-icon {
    position: absolute;
    pointer-events: none;
    transform: translateY(-50%);
    left: 12px;
    top: 50%;
  }

  .arrow-forward-icon {
    position: absolute;
    transform: translateY(-50%);
    background-color: $color-surface;
    cursor: pointer;
    height: 100%;
    padding: 0 12px;
    right: 0;
    top: 50%;
    box-sizing: content-box;
  }
}
</style>