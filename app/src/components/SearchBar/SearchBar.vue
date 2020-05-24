<template>
  <div class="search-bar">
    <input class="search-bar-input" type="text" />
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
  height: 40px;
  min-width: 480px;
  background-color: $color-surface;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;

  &:focus-within {
    box-shadow: inset 0 0 0px 1px $color-border;
    background-color: var(--white);
  }

  &-input {
    background-color: transparent;
    box-sizing: border-box;
    font-family: var(--heading-font);
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
    color: rgba($color: #000000, $alpha: $alpha-disabled);
    left: 12px;
    top: 50%;
  }

}
</style>