<template>
  <a :class="['icon-button', `icon-button--${size}`]" @click="$emit('on-click')">
    <Icon :name="icon" :size="computeSize" />
  </a>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { ButtonSize } from "./Button/Button.vue";

@Component
export default class IconButton extends Vue {
  @Prop({ type: String, default: "small" })
  readonly size!: ButtonSize;
  @Prop({ type: String })
  readonly icon!: string;

  get computeSize(): string {
    switch (this.size) {
      case "small":
        return "18";

      default:
        return "24";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.icon-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: #f7f7f7;
  color: #8f92a1;
  cursor: pointer;

  &--small {
    width: 32px;
    height: 32px;
  }

  &--medium {
    width: 48px;
    height: 48px;
  }

  &:hover {
    background: $indigo;
    color: var(--white);
  }

  &:active {
    background: $indigo-dark;
    color: var(--white);
  }
}
</style>