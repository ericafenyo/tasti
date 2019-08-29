<template>
  <button class="button" :class="computeClass" :disabled="disabled" @click="$emit('on-click')">
    <i v-if="true" class="material-icons button-icon">add</i>
    <span class="button-text" v-if="true">{{text}}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      require: true,
      default: () => "Button"
    },
    type: {
      type: String,
      require: false,
      default: () => "primary"
    },

    size: {
      type: String,
      require: false,
      default: () => ""
    },
    icon: {
      type: String,
      require: false,
      default: () => "add"
    },
    disabled: {
      type: Boolean,
      require: false,
      default: () => false
    }
  },

  computed: {
    computeClass() {
      return `button-${this.$props.type} button-${this.$props.size} ${this.$props.icon} `;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.button {
  padding: 0 6px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px solid transparent;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1.5;
  text-align: center;
  cursor: pointer;

  &-primary {
    background-color: $green;
    border-color: $green;
    color: $white;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &-outline {
    background-color: $white;
    border-color: $green;
    color: $green;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &-small {
    height: 32px;
    padding: 0 2px;
  }

  &-text {
    padding: 0 8px;
  }
}
</style>

