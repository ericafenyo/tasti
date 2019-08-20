<template>
  <div class="modal">
    <div class="modal-content"></div>
  </div>
</template>

<script>
export default {};
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

  &-content {
    padding: 24px 0;
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 100%;
    background: #ffffff;
    margin: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}
</style>