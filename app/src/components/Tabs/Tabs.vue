<template>
  <div class="tabs">
    <div
      v-for="(tab, index) in items"
      @click="setActiveTab(index)"
      :key="index"
      :class="['tab-item', {'tab-item-active': (activeIndex == index)}]"
    >{{tab.text}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  activeIndex = 0;
  tabItems = [];

  @Prop({ type: Array, default: [] })
  items: string[];
  /**
   * Emits a action when the active tab is changed
   * @params{number} the active tab index
   */
  @Watch("activeIndex")
  onActiveChanged(value) {
    this.$emit("on-change", value);
  }

  setActiveTab(index) {
    this.activeIndex = index;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources";

.tabs {
  display: flex;
  background-color: $color-surface;
  border-radius: 16px;
  align-items: center;

  justify-content: space-between;
  .tab-item {
    cursor: pointer;
    text-align: center;
    height: 32px;
    flex: 1;
    line-height: 32px;
    border-radius: 12px;
    margin: 3px;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &-active {
      background-color: #fff;
    }
  }
}
</style>
