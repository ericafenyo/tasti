<template>
      <fieldset>
        <legend class="header-2">{{title}}</legend>
        <slot></slot>
      </fieldset>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String, required: false, default: "Title" })
  readonly title: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>