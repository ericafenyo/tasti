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
        <slot></slot>
      </div>
      <div class="divider-dashed mx-4" />
      <div class="modal-footer">
        <div class="modal-footer-actions">
          <Button :text="$t('cancel')" type="secondary" @on-click="onNegative" />
          <Button :text="$t('create')" @on-click="onPositive" />
        </div>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

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
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.modal {
  @include shadow-md;
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