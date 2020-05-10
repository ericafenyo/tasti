<template>
  <div :class="['avatar', `avatar--${size}`, classNames]">
    <span class="avatar-initials" v-if="!hasImage">{{ userInitial }}</span>
    <img v-if="hasImage" :src="src" alt="avatar" class="avatar--image" />
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.686 15H1.314c.013-.737.114-1.294.288-1.712.428-1.295 1.548-2.308 3.052-2.906.946.679 2.107 1.078 3.361 1.078 1.253 0 2.414-.4 3.36-1.078 1.679.668 2.88 1.852 3.173 3.37l.003.02c.08.34.126.745.135 1.228zM3.614 5.683c0-2.43 1.97-4.402 4.401-4.402 2.43 0 4.4 1.971 4.4 4.402s-1.97 4.401-4.4 4.401c-2.431 0-4.401-1.97-4.401-4.401z"
        fill="currentColor"
        fill-rule="nonzero"
      />
    </svg>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

export type AvatarSize = "x-small" | "small" | "medium" | "large";

@Component
export default class Avatar extends Vue {
  @Prop({ type: String, default: "" })
  readonly username!: string;

  @Prop({ type: String, default: "" })
  readonly src!: string;

  @Prop({ type: Boolean, default: true })
  readonly rounded!: boolean;

  @Prop({ type: Boolean, default: true })
  readonly inline!: boolean;

  @Prop({ type: String, default: "small" })
  readonly size!: AvatarSize;

  get hasImage() {
    return !!this.src;
  }

  get userInitial() {
    return !this.hasImage ? this.initial(this.username) : "";
  }

  get classNames() {
    let classes = "";
    const { rounded, inline } = this;
    rounded && (classes += " avatar--rounded ");
    inline && (classes += " avatar--inline ");
    return classes.trim();
  }

  initial(username: string) {
    let parts = username.split(/[ -]/);
    let initials = "";
    for (var i = 0; i < parts.length; i++) {
      initials += parts[i].charAt(0);
    }
    if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
      initials = initials.replace(/[a-z]+/g, "");
    }
    initials = initials.substr(0, 3).toUpperCase();
    return initials;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
@mixin size($size) {
  width: #{$size}px;
  height: #{$size}px;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &--image {
    width: 100%;
    height: 100%;
  }

  &--x-small {
    @include size(24);
  }
  &--small {
    @include size(32);
  }
  &--medium {
    @include size(48);
  }
  &--large {
    @include size(64);
  }

  &--inline {
    display: inline-flex;
  }

  &--rounded {
    border-radius: 50%;
  }
  &-initials {
    font-weight: bold;
    color: rgba($white, $alpha-inactive);
  }
}
</style>