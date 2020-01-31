<template>
  <div
    :style="{backgroundColor: background}"
    class="avatar"
    :class="[`avatar--${size}`, className]"
  >
    <span class="avatar-initials" v-if="!hasImage">{{ userInitial }}</span>
    <img class="avatar-image" v-if="hasImage" :src="src" alt="avatar" />
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import randomColor from "randomcolor";

export type AvatarSize = "x-small" | "small" | "medium" | "large";

@Component
export default class Avatar extends Vue {
  backgroundColors: [
    "#F44336",
    "#FF4081",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#9E9E9E",
    "#607D8B"
  ];

  @Prop({ type: String, default: "" })
  username: string;

  @Prop({ type: String, default: "" })
  src: string;

  @Prop({ type: Boolean, default: true })
  rounded: boolean;

  @Prop({ type: Boolean, default: false })
  inline: boolean;

  @Prop({ type: String, default: "medium" })
  size: AvatarSize;

  get hasImage() {
    return Boolean(this.src);
  }

  get userInitial() {
    return !this.hasImage ? this.initial(this.username) : "";
  }

  get className() {
    console.log(randomColor());
    let classes = "";
    const { rounded, inline } = this;
    rounded && (classes += " avatar--rounded");
    inline && (classes += " avatar--inline");
    return classes.trim();
  }

  get background() {
    if (!this.hasImage) {
      return randomColor();
      // return this.randomBackgroundColor(
      //   this.username.length,
      //   this.backgroundColors
      // );
    }
  }

  initial(username) {
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

  randomBackgroundColor(seed, colors) {
    return colors[seed % colors.length];
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