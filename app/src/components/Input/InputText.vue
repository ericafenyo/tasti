<template>
  <input
    type="text"
    :id="name"
    ref="inputRef"
    :placeholder="placeholder"
    :name="name"
    v-model.trim="model"
    :class="['input-element', 'border-rounded', ...className]"
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
  @Prop() readonly className: any;

  model: string = "";

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
</style>