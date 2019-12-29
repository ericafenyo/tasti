<template>
  <router-link :to="to" v-slot="{ href, route, navigate, isActive, isExactActive }">
    <a class="link" v-html="text" :active="isActive" :href="href" @click="navigate" />
  </router-link>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class Link extends Vue {
  @Prop({ type: String, default: "Link" }) text: string;
  @Prop({ type: String, default: "#" }) to: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.link {
  color: $color-accent;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>