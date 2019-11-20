<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-labelledby="iconName"
    role="presentation"
    class="icon"
    @click.prevent="(event)=>$emit('on-click', event)"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :class="state">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "edit"
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    state: {
      type: String,
      default: "inactive"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.active {
  fill: rgba($black, $alpha-active);
}

.inactive {
  fill: rgba($black, $alpha-inactive);
}

.disabled {
  fill: rgba($black, $alpha-disabled);
}
</style>