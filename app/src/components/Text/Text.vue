<template>
  <p>{{text}}</p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Text"
    }
  }
};
</script>

<style lang="scss" scoped>
</style>