<template>
  <router-link :to="to" v-slot="{ href, route, navigate, isActive }">
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
  @Prop({ type: String, default: "Link" })
  readonly text!: string;

  @Prop({ type: String, default: "#" })
  readonly to!: string;

  @Prop({ type: String, default: "medium" })
  readonly size!: string;
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
    font-weight: 400;
  }

  &--large {
    font-size: 1.2rem;
    font-weight: 400;
  }

  &:hover {
    color: $color-accent;
  }
}
</style>