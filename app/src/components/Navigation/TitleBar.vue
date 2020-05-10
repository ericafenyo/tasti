<template>
  <div class="title-bar">
    <div>
      <h2 class="title-bar--title">{{ title }}</h2>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class TitleBar extends Vue {
  @Prop({ type: String, default: "" })
  readonly title!: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.title-bar {
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4.5rem;

  &--title {
    font-family: $poppins;
    font-size: 22px;
    font-weight: 500;
    color: rgba(23, 23, 23, 0.87);
  }
}
</style>