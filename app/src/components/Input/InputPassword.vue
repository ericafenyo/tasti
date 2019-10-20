<template>
  <span class="input-password-wrapper">
    <input
      class="input-password"
      :type="computeInputType"
      required
      :id="name"
      :placeholder="placeholder"
      :name="name"
      v-model="model"
      ref="inputPassword"
    />
    <Icon :name="computeIcon" @on-click="toggleVisibility" />
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import Icon from "../Icons/Icon.vue";

@Component({
  components: { Icon }
})
export default class InputText extends Vue {
  @Prop(String) readonly value: string;
  @Prop(String) readonly name: string;
  @Prop(Boolean) readonly disabled: boolean;
  @Prop(String) readonly helperText: string;
  @Prop(String) readonly placeholder: string;
  @Prop(String) readonly className: string;

  model: string = "";
  isVisible: boolean = false;

  get computeIcon(): string {
    return this.isVisible ? "visibilityOff" : "visibility";
  }

  get computeInputType(): string {
    return this.isVisible ? "text" : "password";
  }

  toggleVisibility(event) {
    console.log(event.target);
this.$refs.inputPassword.focus()
    this.isVisible = !this.isVisible;
  }

  @Watch("model")
  onModelChanged(value) {
    this.$emit("on-input", { value, name: this.name });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.input-password-wrapper {
  position: relative;

  .icon {
    position: absolute;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
  }
}
.input-password {
  font-family: $font;
  height: 48px;
  background-color: $color-surface;
  font-size: 1rem;
  color: $color-primary-text;
  border: 0;
  box-shadow: inset 0 0 0 0px $color-border;
  padding-left: 1rem;
  padding-right: 3rem;
  border-radius: 3px;
  width: 100%;
  z-index: 0;

  &:focus {
    box-shadow: inset 0 0 0px 2px $color-accent;
  }

  &:hover {
    box-shadow: inset 0 0 0px 2px $color-accent;
  }
}
</style>