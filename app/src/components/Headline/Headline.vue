<template>
  <div>
    <BaseHeadline :level="level" class="headline">{{text}}</BaseHeadline>
  </div>
</template>

<script>
import BaseHeadline from "./BaseHeadline";

export default {
  components: {
    BaseHeadline
  },

  props: {
    text: {
      type: String,
      required: true,
      default: "Headline"
    },

    level: {
      type: Number,
      required: true,
      default: 1
    }
  }
};
</script>

<style lang="scss" scoped>
.headline {
  font-family: $font;
}
</style>