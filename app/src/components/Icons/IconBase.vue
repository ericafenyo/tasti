<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    :aria-labelledby="iconName"
    role="presentation"
    class="icon"
    @click.prevent="(event)=>$emit('on-click', event)"
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
    }
  }
};
</script>