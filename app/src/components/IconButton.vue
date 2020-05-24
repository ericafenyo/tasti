<template>
  <a @click="toggleActive" class="icon-button" :class="[classNames, {'active': active}]">
    <Icon :name="icon" :size="iconSize" />
  </a>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import { ButtonSize } from "./Button/Button.vue";
import { IconOption } from "./Icons/Icon.vue";

@Component
export default class IconButton extends Vue {
  active: boolean = false;

  @Prop({ type: String, default: "small" })
  readonly size!: ButtonSize;

  @Prop({ type: String, default: "edit" })
  readonly icon!: IconOption;

  @Prop({ type: Boolean, default: false })
  readonly auto!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly isActive!: boolean;

  get iconSize(): string {
    switch (this.size) {
      case "small":
        return "18";

      default:
        return "24";
    }
  }

  get classNames(): string {
    const classes = [];
    const { size } = this;
    classes.push(`icon-button--${size}`);
    return classes.join(",");
  }

  toggleActive() {
    if (this.auto) {
      this.active = !this.active;
    }
  }

  @Watch("active", { immediate: true })
  onActiveChanged(bool: boolean) {
    this.$emit("change", this.active);
  }

  @Watch("isActive", { immediate: true })
  onIsActiveChanged(isActive: boolean) {
    this.active = isActive;
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
  color: var(--icon-inactive);
  cursor: pointer;
  transition: all 0.2s;

  &--small {
    width: 32px;
    height: 32px;
  }

  &--medium {
    width: 48px;
    height: 48px;
  }

  &:hover {
    background: var(--surface);
  }

  &:active {
    background: #e2e8f0;
  }

  &.active {
    color: var(--accent);
  }
}
</style>