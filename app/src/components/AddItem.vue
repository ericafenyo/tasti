<template>
  <div class="add-item" @click="$emit('click')">
    <Icon class="add-item-icon" name="add" />
    <span class="add-item-text">{{text}}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AddItem extends Vue {
  @Prop({ type: String, default: "" })
  readonly text!: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.add-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
  color: #4a5568;
  font-weight: 400;
  font-size: 14px;
  padding: 8px;
}
</style>