<template>
  <div class="context-menu-item">
    <Icon :name="icon" />
    <span>{{text}}</span>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { IconOption } from "../Icons/Icon.vue";

@Component
export default class ContextMenuItem extends Vue {
  @Prop({ type: String, default: "edit" })
  readonly icon!: IconOption;
  @Prop({ type: String, default: "Edit option" })
  readonly text!: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.context-menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #3f3356;
  cursor: pointer;

  &:hover {
    background-color: #f7f5f9;
  }

  span {
    margin: 0 16px;
  }
}
</style>