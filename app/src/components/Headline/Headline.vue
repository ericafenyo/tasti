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
      type: Number,
      required: true,
      default: 1
    }
  }
};
</script>

<style lang="scss" scoped>
.headline {
  &-1 {
    font-size: 2.5rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    color: #333333;
    line-height: 1;
  }
  &-2 {
    line-height: 1.06667;
    letter-spacing: -0.025em;
    font-size: 1.875rem;
    color: #333333;
    line-height: 1.06667;
  }

  &-3 {
    font-size: 1.375rem;
    color: #13293f;
    line-height: 1.18182;
    font-weight: 400;
    letter-spacing: -0.015em;
    color: #13293f;
    line-height: 1.18182;
  }
}
</style>