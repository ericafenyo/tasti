<template>
  <fieldset>
    <label :for="name">{{label}}</label>
    <textarea
      class="textarea"
      :id="name"
      ref="inputTextArea"
      :placeholder="placeholder"
      :name="name"
    ></textarea>
  </fieldset>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import BaseInput from "../Input/BaseInput.vue";

import autosize from "autosize";

@Component
export default class Textarea extends BaseInput {
  mounted() {
    autosize(this.$refs.inputTextArea);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.textarea {
  background: rgba(9, 30, 66, 0.04);
  border-color: rgba(9, 30, 66, 0.13);
  box-shadow: inset 0 0 0 1px rgba(9, 30, 66, 0.13);
  margin-bottom: 4px;
  min-height: 100px;
  width: 100%;
  resize: none;
  border-radius: 4px;
  padding: 8px 12px;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
}
</style>