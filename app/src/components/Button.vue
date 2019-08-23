<template>
  <button class="ui-button" :class="computeClass" @click="$emit('on-click')">{{label}}</button>
</template>

<script>
export default {
  props: ["label", "type"],

  computed: {
    computeClass() {
      return `ui-button-${this.$props.type}`;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.ui-button {
  height: 48px;
  width: 100%;
  border-radius: 4px;
  padding: 0 16px;
  border: none;
  font-weight: 600;
  margin: 24px 0;

  &-primary {
    background-color: $green;
    color: $white;
  }
}
</style>

