<template>
  <input
    :id="`input-${name}`"
    :placeholder="placeholder"
    :name="name"
    :value="value"
    @input="$emit('on-input',$event.target.value)"
    type="text"
  />
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import BaseInput from "./BaseInput.vue";

@Component
export default class InputText extends BaseInput {}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>