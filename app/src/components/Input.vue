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
  width: 100%;
  font-family: $font;
  &-label {
    display: block;
    text-transform: uppercase;
    font-size: 12px;
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
    }
  }

  &-error {
    margin-top: 8px;
    font-size: 14px;
    color: $red;
  }
}
</style>

