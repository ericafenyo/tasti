<template>
  
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";

@Component
export default class TabItem extends Vue {
  isActive = false;

  @Prop({ type: String, default: "" })
  text: string;

  @Prop({ type: Boolean, default: false })
  selected: boolean;

  mounted() {
    this.isActive = this.selected;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>