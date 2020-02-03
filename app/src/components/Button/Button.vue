<template>
  <button
  
    :class="['button', computeClass]"
    :disabled="disabled"
    @click="$emit('on-click')"
  >
    <i v-if="icon" class="material-icons button-icon">{{icon}}</i>
    <span class="button-text" v-if="!loading">{{text}}</span>
    <span v-if="loading">
      <Loader />
    </span>
  </button>
</template>

<script lang="ts">
export type ButtonSize = "x-small" | "small" | "medium" | "large";

import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { type } from "os";

@Component
export default class Button extends Vue {
  @Prop({ type: String, default: "Button" })
  text: string;

  @Prop({ type: String, default: "primary" })
  type: string;

  @Prop({ type: String, default: "medium" })
  size: ButtonSize;

  @Prop({ type: String, default: "" })
  icon: string;

  @Prop({ type: Boolean, default: false })
  disabled: boolean;

  @Prop({ type: Boolean, default: false })
  loading: boolean;

  @Prop({ type: String, default: "submit" })
  htmlType: string;

  get computeClass() {
    return `button--${this.$props.type} button--${this.$props.size} ${this.$props.icon} `;
  }
}
</script>


<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.button {
  font-family: $font;
  padding: 0 1em;
  min-width: 80px;
  border-radius: 3px;
  overflow: hidden;
  border: 1.5px solid transparent;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.2s linear, color 0.2s linear;

  // Button sizes
  &--x-small {
    height: 32px;
  }

  &--small {
    height: 32px;
  }

  &--medium {
    height: 40px;
  }

  &--large {
    height: 48px;
  }

  // Button types
  &--primary {
    background-color: $color-accent;
    border-color: $color-accent;
    color: $white;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--secondary {
    background-color: $color-surface;
    border-color: $color-surface;
    color: #242a31;
  }

  &--outline {
    background-color: $white;
    border-color: $color-accent;
    color: $color-accent;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--text {
    padding: 0 8px;
    background-color: transparent;
  }
}
</style>
