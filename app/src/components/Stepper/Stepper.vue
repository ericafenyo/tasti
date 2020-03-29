<template>
  <div class="stepper">
    <div class="stepper-header">
      <slot name="header" />
    </div>
    <div class="stepper-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class Stepper extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.stepper {
  &-header {
    
  }

  &-content {
    overflow-y: auto;
    margin: 3rem 0;
  }
}
</style>
