<template>
  <div
    v-show="isOpen"
    :class="['overlay', {'overlay--translucent': (translucent)}]"
    :isOpen="isOpen"
  >
    <div
      :class="['overlay-content', {'justify-center' : (centerHorizontal), 'items-center': (centerVertical)}]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";

type OverlayEnvironment = "light" | "dark";

@Component
export default class Overlay extends Vue {
  /**
   * Determines whether or not the overlay is displayed.
   */
  @Prop({ type: Boolean, default: false })
  isOpen: boolean;

  /**
   * Determines the theme of the overlay.
   * Allowed values: light(default), dark.
   */
  @Prop({ type: String, required: false, default: "light" })
  readonly environment!: OverlayEnvironment;

  @Prop({ type: Boolean, required: false, default: true })
  readonly translucent!: boolean;

  @Prop({ type: Boolean, default: true })
  centerHorizontal: boolean;

  @Prop({ type: Boolean, default: true })
  centerVertical: boolean;

  hideBodyScrollBar(hideScrollBar: boolean) {
    const bodyElement = document.querySelector("body");
    if (hideScrollBar) {
      bodyElement.classList.add("clip-content");
    } else {
      bodyElement.classList.remove("clip-content");
    }
  }

  @Watch("isOpen", { immediate: true })
  isOpenChanged(opened: boolean) {
    // if (opened) {
    this.hideBodyScrollBar(true);
    // } else {
    // this.hideBodyScrollBar(false);
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.overlay {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
  z-index: 2;

  background-color: $white;

  &--translucent {
    background-color: rgba($color: $white, $alpha: 0.95);
  }

  &-content {
    display: flex;
  }
}
</style>