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
      :hasAction="hasAction"
      :actionRoute="actionRoute"
      :actionText="actionText"
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
  @Prop({ type: Boolean, default: false })
  hasAction: boolean;

  @Prop({ type: String, default: "" })
  actionText: string;

  @Prop({ type: String, default: "" })
  actionRoute: string;

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

@mixin InputPlaceholderStyle {
  // ::-webkit-input-placeholder {
  //   /* WebKit, Blink, Edge */
  //   color: #d0c9d6;
  // }
  // :-moz-placeholder {
  //   /* Mozilla Firefox 4 to 18 */
  //   color: #d0c9d6;
  //   opacity: 1;
  // }
  // ::-moz-placeholder {
  //   /* Mozilla Firefox 19+ */
  //   color: #d0c9d6;
  //   opacity: 1;
  // }
  // :-ms-input-placeholder {
  //   /* Internet Explorer 10-11 */
  //   color: #d0c9d6;
  // }
  // ::-ms-input-placeholder {
  //   /* Microsoft Edge */
  //   color: #d0c9d6;
  // }

  ::placeholder {
    /* Most modern browsers support this now. */
    color: rgba($color: #000000, $alpha: .5);
  }
}

.input {
  @include InputPlaceholderStyle;
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
    // background-color: rgba($color-surface, 0.6);
    background-color: rgba($white, 0.4);
    box-shadow: 0 7px 64px 0 rgba(0, 0, 0, 0.07);
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
      border-color: rgba($color-primary-text,  .2);
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
