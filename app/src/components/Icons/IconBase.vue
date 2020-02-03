<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    :aria-labelledby="iconName"
    role="presentation"
    class="icon"
    :style="{boxSizing:'content-box'}"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g fill="currentColor">
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
    size: {
      type: Number,
      default: 16
    }
  }
};
</script>