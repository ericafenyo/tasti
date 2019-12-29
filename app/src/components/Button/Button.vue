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
  font-family: $font;
  padding: 0 1em;
  min-width: 80px;
  height: 40px;
  border-radius: 3px;
  overflow: hidden;
  border: 1.5px solid transparent;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
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

  &-secondary {
    background-color: $color-surface;
    border-color: $color-surface;
    color: #242a31;
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
    height: 36px;
    padding: 0 2px;
  }

  &-text {
    padding: 0 8px;
    background-color: transparent;
  }
}
</style>
