<template>
  <Overlay :isOpen="isOpen">
    <div class="modal">
      <div v-if="title" class="modal-header">
        <span class="modal-title">{{title}}</span>
        <div class="close">
          <Icon name="close" />
        </div>
      </div>
      <div class="modal-body">
        <slot name="content"></slot>
      </div>
      <div class="divider-dashed mx-4" />
      <div class="modal-footer">
        <div class="modal-footer-actions">
          <slot name="button-negative"></slot>
          <slot name="button-positive"></slot>
        </div>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  /**
   * Determines whether or not the modal is displayed.
   */
  @Prop({ type: Boolean, default: true })
  isOpen: boolean;

  @Prop({ type: String, default: "" })
  title: string;

  @Emit("on-positive")
  onPositive() {}

  @Emit("on-negative")
  onNegative() {}

  @Watch("isOpen")
  onVisibilityChange(visible) {
    if (!visible) {
      this.$emit("on-close");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.modal {
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  background-color: $white;
  min-width: 640px;
  border-radius: 4px;
  overflow: hidden;

  &-footer {
    padding: 24px;
    &-actions {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>