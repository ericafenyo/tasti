<template>
  <p>{{text}}</p>
</template>

<script>
export default {
  props: {
    text: {
      type: Number,
      default: "Text"
    },
  },
};
</script>

<style lang="scss" scoped>
</style>