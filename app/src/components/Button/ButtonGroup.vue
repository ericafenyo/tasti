<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class ButtonGroup extends Vue {
  slotItems = this.$slots.default;


  mounted() {
      console.log(this.$slots.default);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.button-group {
  .button:not(:last-child) {
    margin-right: 12px;
  }
}
</style>