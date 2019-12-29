<template>
  <div class="context-menu">
    <ContextMenuItem
      v-for="(menuItem, index) in items"
      :text="menuItem.text"
      :icon="menuItem.icon"
      :key="index"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import ContextMenuItem from "./ContextMenuItem.vue";
import { IconOption } from "../Icons/Icon.vue";

export type ContextMenuItemOption = {
  icon: IconOption;
  text: string;
};

@Component({ components: { ContextMenuItem } })
export default class ContextMenu extends Vue {
  @Prop({ type: Object, default: [] }) items: ContextMenuItemOption;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.context-menu {
    padding: 16px 0;
}
</style>