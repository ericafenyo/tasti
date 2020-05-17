<template>
  <BaseHeadline :level="level" class="headline" :class="`headline-${level}`">{{text}}</BaseHeadline>
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
      type: [Number, String],
      required: true,
      default: 1
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_resources";
.headline {
  &-1 {
    @include header-1;
  }
  &-2 {
    @include header-2;
  }

  &-3 {
    @include header-3;
  }
  &-4 {
    @include header-4;
  }
}
</style>
