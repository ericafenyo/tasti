<template>
  <span class="input-password">
    <input
      :class="['input-element', ...className]"
      :type="computeInputType"
      required
      :id="name"
      :placeholder="placeholder"
      :name="name"
      v-model="model"
      ref="inputPassword"
    />
    <Icon
      :size="20"
      :class="[(isVisible? 'icon-active' :'icon-inactive' )]"
      :name="computeIcon"
      @click.native="toggleVisibility"
    />
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";

@Component
export default class InputText extends Vue {
  @Prop(String) readonly value: string;
  @Prop(String) readonly name: string;
  @Prop(Boolean) readonly disabled: boolean;
  @Prop(String) readonly helperText: string;
  @Prop(String) readonly placeholder: string;
  @Prop() readonly className: any;

  model: string = "";
  isVisible: boolean = false;

  get computeIcon(): string {
    return this.isVisible ? "visibilityOff" : "visibility";
  }

  get computeInputType(): string {
    return this.isVisible ? "text" : "password";
  }

  toggleVisibility(event) {
    this.isVisible = !this.isVisible;
  }

  @Watch("model")
  onModelChanged(value) {
    this.$emit("on-input", { value, name: this.name });
  }

  @Watch("value", { immediate: true })
  onValueChanged(value) {
    this.model = value;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.input-password {
  position: relative;

  .icon {
    position: absolute;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
  }

  .icon-inactive {
    color: #b0abb5;
  }

  .icon-active {
    color: #7c7982;
  }
}
</style>