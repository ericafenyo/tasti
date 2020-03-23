<template>
  <div class="form-stepper-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class StepperItem extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.form-stepper-item {
  .form-basic {
    width: 100%;
    padding: 0em;
    margin-top: 2em;
    margin-bottom: 2em;
  }
}
</style>