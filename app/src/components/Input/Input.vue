<template>
  <div class="input">
    <label :for="name" class="input-label">{{label}}</label>
    <component
      :is="computeComponent"
      :id="name"
      :placeholder="placeholder"
      :type="type"
      :name="name"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

import InputText from "./InputText.vue";
import InputPassword from "./InputPassword.vue";

@Component({
  components: {
    InputText,
    InputPassword
  }
})
export default class Input extends Vue {
  @Prop(String) readonly label: string;
  @Prop(String) readonly text: string;
  @Prop(Boolean) readonly size: boolean;
  @Prop(String) readonly icon: string;
  @Prop(String) readonly type: string;
  @Prop(String) readonly state: string;
  @Prop(String) readonly className: string;
  @Prop(String) readonly placeholder: string;
  @Prop(String) readonly name!: string;
  @Prop(String) readonly value: string;
  @Prop(String) readonly disabled: boolean;
  @Prop(String) readonly focused: boolean;
  @Prop(String) readonly required: boolean;
  @Prop(String) readonly helperText: boolean;

  capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  computeClasses(errors) {
    const { state } = this.$props;
    return (state ? `input-${state}` : "") + (errors[0] ? " input-error" : "");
  }

  get computeComponent(): string {
    console.log(this.$props);

    const { capitalize, type } = this;
    return type ? `Input${capitalize(type)}` : "InputText";
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.input {
  display: flex;
  flex-direction: column;

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
