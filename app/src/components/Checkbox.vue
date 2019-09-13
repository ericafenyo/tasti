<template>
  <label class="checkbox-wrapper">
    <span class="checkbox">
      <input class="checkbox-input" type="checkbox" />
      <span class="checkbox-inner"></span>
    </span>
    <span>
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "checkbox"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_mixins.scss";
.checkbox-wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(14, 5, 5, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  display: inline-block;
  line-height: unset;

  span {
    padding: 0 8px;
  }

  .checkbox {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    position: relative;
    top: -0.09em;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    outline: none;
    cursor: pointer;

    &-input {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }

    &-inner {
      position: relative;
      top: 0;
      left: 0;
      display: block;
      width: 16px;
      height: 16px;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      border-collapse: separate;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
}
</style>