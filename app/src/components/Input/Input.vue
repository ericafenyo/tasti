<template>
  <div class="input">
    <div class="flex justify-between">
      <label :for="name" class="input-label">{{label}}</label>
      <Link size="small" v-if="hasAction" :text="actionText" :to="actionRoute" />
    </div>
    <component
      :is="computeComponent"
      :id="name"
      :placeholder="placeholder"
      :type="type"
      :name="name"
      :className="className"
      :required="required"
      :value="value"
      @on-input="(inputData) => $emit('on-input', inputData)"
    />
    <span
      v-if="hasHint"
      :class="['input-help-message', {'input-help-message-error':hasError }, {'hidden': !hasError}]"
    >Field is required</span>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";

import InputText from "./InputText.vue";
import InputPassword from "./InputPassword.vue";
import BaseInput from "./BaseInput.vue";
import { watch } from "fs";

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
    if (this.className) {
      const [inputError] = this.className;
      return inputError["input-error"];
    }
    return false;
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
    background-color: rgba($color-surface, 0.6);
    font-size: 1rem;
    color: $color-primary-text;
    border: solid 1px $color-border;
    padding-left: 1rem;
    padding-right: 3rem;
    border-radius: 6px;
    width: 100%;
    z-index: 0;
    transition: all 0.2s;

    &:focus {
      // box-shadow: inset 0 0 0px 2px $color-accent;
      background-color: $white;
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
