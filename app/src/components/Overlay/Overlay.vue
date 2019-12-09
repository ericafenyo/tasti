<template>
  <div v-show="isOpen" class="overlay" :isOpen="isOpen">
    <div class="overlay-content h-full">
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
  @Prop({ type: Boolean, required: false, default: false })
  readonly isOpen!: boolean;

  /**
   * Determines the theme of the overlay.
   * Allowed values: light(default), dark.
   */
  @Prop({ type: String, required: false, default: "light" })
  readonly environment!: OverlayEnvironment;

  @Prop({ type: Boolean, required: false, default: true })
  readonly translucent!: boolean;

  hideBodyScrollBar(hideScrollBar: boolean) {
    const bodyElement = document.querySelector("body");
    if (hideScrollBar) {
      bodyElement.classList.add("clip-content");
    } else {
      bodyElement.classList.remove("clip-content");
    }
  }

  @Watch("isOpen")
  isOpenChanged(opened: boolean) {
    if (opened) {
      this.hideBodyScrollBar(true);
    }else{
      this.hideBodyScrollBar(false);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.overlay {
  background-color: rgba($color: $white, $alpha: 0.85);
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  // opacity: 0;
  overflow: hidden;
  z-index: 2;

  &-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>