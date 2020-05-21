<template>
  <fieldset>
    <div class="flex justify-between">
      <label class="textarea-label" :for="name">{{label}}</label>
      <slot name="label-right">
        <Link size="small" v-if="hasAction" :text="actionText" :to="actionRoute" />
      </slot>
    </div>
    <textarea
      :id="name"
      :placeholder="placeholder"
      :name="name"
      class="textarea"
      rows="6"
      ref="inputTextArea"
    ></textarea>
  </fieldset>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import autosize from "autosize";
import BaseInput from "../Input/BaseInput.vue";

@Component
export default class Textarea extends BaseInput {
  $refs!: {
    inputTextArea: HTMLTextAreaElement;
  };
  
  @Prop({ type: String, default: "" })
  readonly label!: string;

  @Prop({ type: Boolean, default: false })
  readonly hasAction!: boolean;

  mounted() {
    autosize(this.$refs.inputTextArea);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.textarea {
  font-family: var(--heading-font);
  background-color: rgba($color-surface, 0.2);
  font-size: 0.875rem;
  line-height: 1.5;
  color: $color-primary-text;
  border: 1px solid $color-border;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  width: 100%;
  transition: all 0.2s;

  &-label {
    font-size: 0.875em;
    margin-bottom: 0.5rem;
    color: $color-primary-text;
    font-weight: 500;
  }

  &:hover {
    border-color: #bfbfbf;
  }

  &:focus {
    box-shadow: inset 0 0 0px 1px var(--accent);
    background-color: var(--white);
    border-color: var(--accent);
  }
}
</style>