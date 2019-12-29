<template>
  <div class="card-module">
    <div class="container">
      <fieldset class="my-3">
        <legend class="header-2">{{title}}</legend>
        <slot></slot>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String, required: false, default: "Title" })
  readonly title: string;
}
</script>