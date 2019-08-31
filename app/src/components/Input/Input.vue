<template>
  <div class="input">
    <label :for="name" class="input-label">{{label}}</label>
    <ValidationProvider :name="name" :rules="validate" v-slot="props" slim>
      <input
        :id="name"
        :placeholder="placeholder"
        class="input-element"
        :class="computeClasses"
        :type="type"
        :name="name"
        @input.prevent="onInput"
        v-model="model"
      />
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
      require: false,
      default: () => "Label"
    },

    type: {
      type: String,
      require: false,
      default: () => "text"
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
    state: {
      type: String,
      require: false,
      default: () => ""
    },
    name: {
      type: String,
      require: false,
      default: () => ""
    },

    placeholder: {
      type: String,
      require: false,
      default: () => "Enter a your text"
    },

    value: {
      type: String,
      require: false,
      default: () => ""
    },
    disabled: {
      type: Boolean,
      require: false,
      default: () => false
    },

    required: {
      type: Boolean,
      require: false,
      default: () => false
    }
  },
  components: {
    name: "Input"
  },

  computed: {
    computeClasses() {
      console.log(this.$props);

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

  methods: {
    onInput: function({ target }) {
      this.$emit("on-input", target);
    }
  }
};
</script>

<style lang="scss" scoped>
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
    height: 40px;
    border: none;
    border-bottom: solid 1px $brown-grey-two;
    background-color: $white;
    font-size: 16px;
    color: $charcoal;

    &:focus {
      outline: none;
      border-width: 2px;
    }
  }

  &-error {
    border-color: $red;
  }
}
</style>

