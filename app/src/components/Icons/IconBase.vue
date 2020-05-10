<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
    :aria-labelledby="iconName"
    role="presentation"
    class="icon"
    :style="{boxSizing:'content-box'}"
  >
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <g fill="currentColor">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class IconBase extends Vue {
  @Prop({ type: String, default: "edit" })
  readonly iconName!: string;

  @Prop({ type: [String, Number], default: 16 })
  readonly size!: string | number;
}
</script>