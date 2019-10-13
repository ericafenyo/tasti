<template>
  <div class="input">
    <label :for="name" class="input-label">{{label}}</label>
    <ValidationProvider ref="inputValidator" :name="name" :rules="validate" v-slot="{errors}" slim>
      <input
        mode="eager"
        :id="name"
        ref="inputRef"
        :placeholder="placeholder"
        class="input-element"
        :class="computeClasses(errors)"
        :type="type"
        :name="name"
        v-model="model"
      />
      <div v-show="errors[0]" class="input-help">
        <svg
          aria-hidden="true"
          focusable="false"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <span :class="{'input-help-message' : (true)}">{{errors[0]}}</span>
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  data: () => ({
    model: ""
  }),
  props: {
    label: {
      type: String,
      default: () => "Label"
    },

    type: {
      type: String,
      default: () => "text"
    },

    size: {
      type: String,
      default: () => ""
    },
    icon: {
      type: String,
      default: () => ""
    },
    state: {
      type: String,
      default: () => ""
    },
    name: {
      type: String,
      default: () => ""
    },

    placeholder: {
      type: String,
      default: () => "Enter a your text"
    },

    value: {
      type: String,
      default: () => ""
    },
    disabled: {
      type: Boolean,
      default: () => false
    },

    required: {
      type: Boolean,
      default: () => false
    },

    helperText: {
      type: String,
      default: () => ""
    },

    validate: {
      type: String,
      default: () => ""
    }
  },

  watch: {
    model(value) {
      this.$emit("on-input", value, this.name);
    }
  },

  computed: {},

  methods: {
    computeClasses(errors) {
      const { state } = this.$props;
      return (
        (state ? `input-${state}` : "") + (errors[0] ? " input-error" : "")
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  &-label {
    font-size: 0.875em;
    margin-bottom: 0.5rem;
    color: $color-primary-text;
    font-weight: 500;
  }
  &-element {
    height: 48px;
    background-color: $color-surface;
    font-size: 1em;
    color: $color-primary-text;
    border: solid 1px $color-border;
    padding: 0 1rem;
    border-radius: 3px;
    width: 100%;

    &:focus {
      outline: none;
      border: solid 2px $color-accent;
    }
  }

  &-help {
    display: flex;
    align-items: center;
    margin-top: 8px;
    &-message {
      font-size: 12px;
      margin: 0 8px;
      color: $green;
    }
  }

  &-error {
    border-color: red;
    & + .input-help {
      svg {
        color: red;
      }

      .input-help-message {
        color: red;
      }
    }
  }
}
</style>
