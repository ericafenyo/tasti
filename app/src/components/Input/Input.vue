<template>
  <div class="input">
    <label :for="name" class="input-label">{{label}}</label>
    <component
      :is="computeComponent"
      :id="name"
      :placeholder="placeholder"
      :type="type"
      :name="name"
      :className="className"
      :required="required"
      @on-input="(inputData) => $emit('on-input', inputData)"
    />
    <span
      :class="['input-help-message', {'input-help-message-error':hasError }, {'opacity-0': !hasError}]"
    >Field is required</span>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

import InputText from "./InputText.vue";
import InputPassword from "./InputPassword.vue";
import BaseInput from "./BaseInput.vue";

@Component({
  components: {
    InputText,
    InputPassword
  }
})
export default class Input extends BaseInput {
  capitalize(value: string) {
    console.log();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  computeClasses(errors) {
    const { state } = this.$props;
    return (state ? `input-${state}` : "") + (errors[0] ? " input-error" : "");
  }

  get computeComponent(): string {
    const { capitalize, type } = this;
    return type ? `Input${capitalize(type)}` : "InputText";
  }

  get hasError(): boolean {
    const [inputError] = this.className;
    return inputError["input-error"];
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.input {
  display: flex;
  flex-direction: column;

  &-label {
    font-size: 0.875em;
    margin-bottom: 0.5rem;
    color: $color-primary-text;
    font-weight: 500;
  }

  /deep/ &-element {
    font-family: $font;
    height: 48px;
    background-color: $color-surface;
    font-size: 1rem;
    color: $color-primary-text;
    border: 0;
    box-shadow: inset 0 0 0 0px $color-border;
    padding-left: 1rem;
    padding-right: 3rem;
    border-radius: 3px;
    width: 100%;
    z-index: 0;
    transition: all 0.2s;

    &:focus {
      box-shadow: inset 0 0 0px 2px $color-accent;
    }

    &.input-error {
      box-shadow: inset 0 0 0px 2px $red;
    }
  }

  &-help-message {
    font-size: 12px;
    margin-top: 0.5rem;
    font-weight: 500;

    &-error {
      color: $red;
    }
  }
}
</style>
