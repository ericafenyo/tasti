<template>
  <div class="flex tabs">
    <div
      v-for="(tab, index) in items"
      class="tab-item"
      :class="{'active' : (activeIndex === index)}"
      :key="index"
      @click="setActiveTab(index)"
    >{{tab.text}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  activeIndex = 0;

  @Prop({ type: Array, default: [] })
  readonly items!: string[];

  @Watch("activeIndex", { immediate: true })
  onActiveChanged(value: any) {
    this.$emit("on-change", this.items[value]);
  }

  setActiveTab(index: number) {
    this.activeIndex = index;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources";

.tabs {
  .tab-item {
    cursor: pointer;
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &.active {
      background-color: var(--surface);
    }
  }
}
</style>
