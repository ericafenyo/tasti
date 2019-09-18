<template>
  <p class="text" :class="composeClass">{{text}}</p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

/**
 *
 */
@Component
export default class Text extends Vue {
  // Props
  @Prop({ type: String, default: "Text" }) readonly text!: string;
  @Prop({ type: String, default: "" }) readonly size!: string;
  @Prop({ type: String, default: "" }) readonly color!: string;

  get composeClass(): String {
    const { size } = this;
    return size ? `text-${size}` : "";
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.text {
  font-size: 1em;
  
  }
</style>