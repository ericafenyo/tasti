<template>
  <button class="button" :class="computeClass" :disabled="disabled" @click="$emit('on-click')">
    <i v-if="icon" class="material-icons button-icon">{{icon}}</i>
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
      default: () => ""
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
@import "@/scss/_resources.scss";

.button {
  padding: 0 1em;
  height: 48px;
  font-family: sans-serif;
  border-radius: 3px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 12px;
  transition: background-color 0.2s linear, color 0.2s linear;

  &-primary {
    background-color: $color-accent;
    border-color: $color-accent;
    color: $white;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &-outline {
    background-color: $white;
    border-color: $color-accent;
    color: $color-accent;

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
    background-color: transparent;
  }
}
</style>
