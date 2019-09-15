<template>
  <label class="checkbox-wrapper">
    <span class="checkbox">
      <ValidationProvider name="checkbox" rules="checkbox" slim>
        <input class="checkbox-input" type="checkbox" v-model="checked" />
      </ValidationProvider>
      <div class="checkbox-inner" />
      <svg class="_1ad56513" height="6px" version="1.1" viewBox="0 0 8 6" width="8px">
        <defs />
        <g fill="none" fill-rule="evenodd" id="Symbols" stroke="none" stroke-width="1">
          <g
            fill="#FFFFFF"
            id="Checkbox/Checked/Default"
            transform="translate(-4.000000, -5.000000)"
          >
            <g id="Checkbox/Checked">
              <path
                d="M6.65183265,10.8942434 L4.10636422,8.33133321 C3.96454526,8.1903244 3.96454526,7.96081005 4.10636422,7.81830114 L4.62054884,7.30601913 C4.76236779,7.16501031 4.99291451,7.16501031 5.13473346,7.30601913 L6.9092886,9.10013126 L10.8649465,5.10613163 C11.0067655,4.96512282 11.2373122,4.96512282 11.3791312,5.10613163 L11.8933158,5.6191637 C12.0351347,5.76017251 12.0351347,5.9904369 11.8933158,6.13069567 L7.16601727,10.8942434 C7.02419831,11.0352522 6.7936516,11.0352522 6.65183265,10.8942434"
                id="Check"
              />
            </g>
          </g>
        </g>
      </svg>
    </span>
    <span v-if="showLabel">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    };
  },

  props: {
    name: {
      type: String,
      default: "checkbox"
    }
  },

  computed: {
    showLabel() {
      return this.$slots.default ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
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
    width: 16px;
    height: 16px;
    padding: 0;
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

      &:checked ~ .checkbox-inner {
        background: $color-accent;
        border-color: $color-accent;
      }
    }

    &-inner {
      position: relative;
      top: 0;
      left: 0;
      width: 16px;
      height: 16px;
      background-color: #fff;
      border: 1px solid #cccccc;
      border-radius: 2px;
      border-collapse: separate;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>