<template>
  <div class="input">
    <div class="flex justify-between">
      <label :for="name" class="input-label">{{label}}</label>
      <slot name="label-right">
        <Link size="small" v-if="hasAction" :text="actionText" :to="actionRoute" />
      </slot>
    </div>
    <component
      :is="computeComponent"
      :id="name"
      :placeholder="placeholder"
      :type="type"
      :name="name"
      :value="value"
      @on-input="(args) => $emit('input', args)"
    />
    <span
      v-if="hasHint"
      :class="['input-help-message', {'input-help-message-error':hasError }, {'hidden': !hasError}]"
    >Field is required</span>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";

import BaseInput from "./BaseInput.vue";
import InputText from "./InputText.vue";
import InputPassword from "./InputPassword.vue";

@Component({
  components: {
    InputText,
    InputPassword
  }
})
export default class Input extends BaseInput {
  @Prop({ type: String, default: "" })
  readonly label!: string;

  @Prop({ type: String, default: "" })
  readonly icon!: string;

  @Prop({ type: String, default: "" })
  readonly state!: string;

  @Prop({ type: String, default: "" })
  readonly helperText!: string;

  @Prop({ type: String, default: "" })
  readonly size!: string;

  @Prop({ type: Boolean, default: false })
  readonly hasHint!: boolean;

  @Prop({ type: String, default: "" })
  readonly type!: string;

  @Prop({ type: Boolean, default: false })
  readonly hasAction!: boolean;

  @Prop({ type: String, default: "" })
  readonly actionText!: string;

  @Prop({ type: String, default: "" })
  readonly actionRoute!: string;
  @Prop({ type: String, default: "" })
  readonly text!: string;

  capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  computeClasses(errors: any[]) {
    const { state } = this.$props;
    return (state ? `input-${state}` : "") + (errors[0] ? " input-error" : "");
  }

  get computeComponent(): string {
    const { capitalize, type } = this;
    return type ? `Input${capitalize(type)}` : "InputText";
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

@mixin InputPlaceholderStyle {
  ::placeholder {
    color: rgba($color: #000000, $alpha: 0.5);
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

  ::v-deep input {
    font-family: var(--heading-font);
    height: 42px;
    background-color: rgba($color-surface, 0.2);
    font-size: 0.875rem;
    color: $color-primary-text;
    border: 1px solid $color-border;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 4px;
    width: 100%;
    z-index: 0;
    transition: all 0.2s;

    &:hover {
      border-color: #bfbfbf;
    }

    &:focus {
      box-shadow: inset 0 0 0px 1px $color-accent;
      border-color: $color-accent;
      background-color: var(--white);
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
