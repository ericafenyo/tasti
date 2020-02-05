<template>
  <router-link :to="to" v-slot="{ href, route, navigate, isActive, isExactActive }">
    <a
      :class="['link', (`link--${size}`)]"
      v-html="text"
      :active="isActive"
      :href="href"
      @click="navigate"
    />
  </router-link>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class Link extends Vue {
  @Prop({ type: String, default: "Link" }) text: string;
  @Prop({ type: String, default: "#" }) to: string;
  @Prop({ type: String, default: "medium" }) size: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.link {
  color: $color-primary-text;
  font-weight: 500;

  &--small {
    font-size: 0.875rem;
  }

  &--medium {
    font-size: 1rem;
  }

  &--large {
    font-size: 1.2rem;
  }

  &:hover {
    color: $color-accent;
  }
}
</style>