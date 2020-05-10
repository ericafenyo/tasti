<template>
  <h4 class="subhead" :class="computeClass">{{text}}</h4>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Subhead extends Vue {
  @Prop({ type: String, default: "Subhead" }) readonly text!: string;
  @Prop({ type: String, default: "" }) readonly size!: string;

  /**
   *
   */
  get computeClass(): String {
    const { size } = this;
    return size ? `subhead-${size}` : "";
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.subhead {
  font-size: 1em;
  font-weight: 700;
}
</style>