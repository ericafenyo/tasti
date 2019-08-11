<template>
  <div class="ui-input">
    <label :for="name" class="ui-input-label">{{label}}</label>
    <input
      :id="name"
      :placeholder="placeholder"
      class="ui-input-element"
      v-validate="validate"
      :type="type"
      :name="name"
      @input.prevent="onInput"
    />
    <div class="ui-input-error">{{errors.first(name)}}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: ""
  }),

  props: ["type", "label", "placeholder", "name", "validate"],

  components: {
    name: "Input"
  },

  methods: {
    onInput: function({ target }) {
      this.$emit("on-input", target, this.fields);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.ui-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
  &-label {
    display: block;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 8px;
    color: $brown-grey-two;
  }
  &-element {
    height: 40px;
    border-radius: 4px;
    border: solid 1px $light-periwinkle;
    background-color: $pale-grey;
    padding: 12px;
    font-size: 16px;
    color: $charcoal;

    &:focus {
      outline: none;
      box-shadow: 0 1px 1px -1px rgba(9, 30, 66, 0.25),
        0 0 0 1px rgba(9, 30, 66, 0.08);
    }
  }

  &-error {
    margin-top: 8px;
    font-size: 14px;
    color: $red;
  }
}
</style>

