<template>
  <button
    :id="id"
    :type="htmlType"
    :class="['button', ...classNames]"
    :disabled="disabled"
    @click="$emit('on-click')"
  >
    <i v-if="icon" class="material-icons button--icon">{{icon}}</i>
    <span class="button--text" v-if="!loading">{{text}}</span>
    <span class="button--loading-indicator" v-if="loading">
      <Loader />
    </span>
  </button>
</template>

<script lang="ts">
export type ButtonSize = "x-small" | "small" | "medium" | "large";
export type ButtonType =
  | "primary"
  | "secondary"
  | "destroy"
  | "confirm"
  | "subtle"
  | "cancel";
export type ButtonStyle = "standard" | "text" | "outline";

import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop({ type: String, default: "Button" })
  readonly text!: string;

  @Prop({ type: String, default: "primary" })
  readonly type!: ButtonType;

  @Prop({ type: String, default: "standard" })
  readonly theme!: ButtonStyle;

  @Prop({ type: Boolean, default: true })
  readonly rounded!: boolean;

  @Prop({ type: String, default: "medium" })
  readonly size!: ButtonSize;

  @Prop({ type: String, default: "" })
  readonly icon!: string;

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly block!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean;

  @Prop({ type: String })
  readonly id!: boolean;

  @Prop({ type: String })
  readonly htmlType!: string;

  get classNames() {
    let classes = [];
    const { type, size, icon, loading, block, rounded } = this;

    classes.push(`button--${type}`);
    classes.push(`button--${size}`);
    icon && classes.push(`${icon}`);
    rounded && classes.push("rounded");
    block && classes.push("block");
    loading && classes.push("loading");
    return classes;
  }
}
</script>


<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.button {
  font-family: $roboto;
  padding: 0 1em;
  min-width: 80px;
  overflow: hidden;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 1.5px;

  &.block {
    width: 100%;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.rounded {
    border-radius: 3px;
  }

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
  }

  &--secondary {
    background-color: $color-surface;
    border-color: $color-surface;
    color: #242a31;
  }

  &--outline {
    background-color: transparent;
    border-color: #dfe3e8;
    color: #a0aec0;
  }

  &--confirm {
    background-color: $green;
    color: $white;

    &:active,
    &:hover,
    &:focus {
      background-color: $green-dark;
    }
  }

  &--subtle {
    background-color: $white;
    color: $grey;
  }

  &.loading {
    opacity: 0.8 !important;
  }

  &--text {
    padding: 0 8px;
    background-color: transparent;
  }

  &--loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
