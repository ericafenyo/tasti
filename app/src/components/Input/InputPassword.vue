<template>
  <span class="input-password">
    <input
      :type="computeInputType"
      :placeholder="placeholder"
      :id="name"
      :name="name"
      @input="$emit('on-input',$event.target.value)"
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
  @Prop({ type: String, default: "" }) readonly value!: string;
  @Prop({ type: String, default: "" }) readonly name!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: String, default: "" }) readonly helperText!: string;
  @Prop({ type: String, default: "" }) readonly placeholder!: string;
  @Prop() readonly className: any;

  model: string = "";
  isVisible: boolean = false;

  get computeIcon(): string {
    return this.isVisible ? "visibilityOff" : "visibility";
  }

  get computeInputType(): string {
    return this.isVisible ? "text" : "password";
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
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
    color: #1a051d;
  }
}
</style>