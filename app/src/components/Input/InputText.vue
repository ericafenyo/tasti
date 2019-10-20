<template>
  <input
    class="input-text"
    type="text"
    :id="name"
    ref="inputRef"
    :placeholder="placeholder"
    :name="name"
    v-model="model"
  />
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
  @Prop(String) readonly className: string;

  model: string = "";

  @Watch("model")
  onModelChanged(value) {
    this.$emit("on-input", { value, name: this.name });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.input-text {
  font-family: $font;
  height: 48px;
  background-color: $color-surface;
  font-size: 1rem;
  color: $color-primary-text;
  border: 0;
  box-shadow: inset 0 0 0 0px $color-border;
  padding: 0 1rem;
  border-radius: 3px;

  &:focus {
    box-shadow: inset 0 0 0 2px $color-accent;
  }
}
</style>