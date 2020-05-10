<template>
  <div>
    <TitleBar title="Explore">
      <ExplorerActions />
    </TitleBar>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import ExplorerActions from "@/components/Navigation/ExplorerActions.vue";

@Component({ components: { ExplorerActions } })
export default class Explore extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>