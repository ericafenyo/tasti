<template>
  <div class="input">
    <label :for="name" class="input-label">{{label}}</label>
    <ValidationProvider ref="inputValidator" :name="name" :rules="validate" v-slot="{errors}" slim>
      <input
        :id="name"
        :placeholder="placeholder"
        class="input-element"
        :class="computeClasses"
        :type="type"
        :name="name"
        v-model="model"
      />
      <p  :class="{'input-help-message' : (true)}">{{errors[0]}}</p>
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
    }
  },

  watch: {
    model(value) {
      const {} = this.$refs;
      this.$emit("on-input", value);
    }
  },

  computed: {
    computeClasses() {
      return `input-${this.$props.state}`;
    },

    validate() {
      let rules = "";
      if (this.required) {
        rules += "required";
      }
      if (/password/.test(this.type)) {
        rules += " min:6";
      } else if (/email/.test(this.type)) {
        rules += " email";
      }

      return rules
        .trim()
        .split(" ")
        .join("|");
    }
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/scss/_mixins.scss";

.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
  font-family: $font;
  &-label {
    font-size: 14px;
    margin-bottom: 8px;
    color: $brown-grey-two;
  }
  &-element {
    height: 42px;
    border: none;
    border-bottom: solid 1px $brown-grey-two;
    background-color: $white;
    font-size: 16px;
    color: $charcoal;
    border: solid 1px #edf0f2;
    background-color: #ffffff;
    padding: 0 0.75em;
    border-radius: 4px;

    &:focus {
      outline: none;
    }
  }

  &-help-message {
    font-size: 12px;
    margin-top: 8px;
    color: $color-primary;
  }

  &-error {
    border-color: $red;
  }
}
</style>

