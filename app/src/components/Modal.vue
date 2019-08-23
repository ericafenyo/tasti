<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">{{title}}</span>
        <div class="close">
          <icon-close />
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IconClose from "../assets/icons/close.svg";
export default {
  components: {
    "icon-close": IconClose
  },

  props: {
    title: ""
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;

  z-index: 1;
  background: rgba($black, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &-title {
    @include header-4;
    color: $hunter-green;
  }

  &-content {
    padding: 16px 16px;
    position: fixed;
    bottom: 0;
    min-height: 100px;
    width: 100%;
    background: #ffffff;
    margin: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}
</style>