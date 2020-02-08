<template>
  <transition name="slide-horizontal">
    <div
      v-if="isVisible"
      class="notice shadow-md"
      :class="[composeNoticeClasses, computeNoticePlacement]"
    >
      <Icon name="info" class="notice-icon" />
      <span v-if="title" v-html="title" class="notice-title" />
      <span v-if="message" v-html="message" class="notice-message" />
      <Icon class="notice-action-close" name="close" @on-click="onDismiss" />
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import { IconOption } from "../Icons/Icon.vue";
import { NotificationType, NotificationPlacement } from ".";

@Component
export default class Notice extends Vue {
  isVisible = true;
  className = "";

  @Prop({ type: String, default: "success" })
  type: NotificationType;

  @Prop({ type: String, default: "" })
  title: string;

  @Prop({ type: String, default: "" })
  message: string;

  @Prop({ type: Boolean, default: false })
  visible: boolean;

  @Prop({ type: String, default: "top-right" })
  placement: NotificationPlacement;

  @Emit("onDismiss")
  emitOnDismiss() {}

  @Watch("visible", { immediate: true })
  onShowNotice(show) {
    this.isVisible = show;
  }

  onDismiss() {
    this.isVisible = false;
    this.emitOnDismiss();
  }

  get composeNoticeClasses(): string {
    return `notice-${this.type}`;
  }

  get computeNoticePlacement(): string {
    return `notice-${this.placement}`;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

%top-space {
  top: 24px;
}

%bottom-space {
  bottom: 24px;
}

%left-space {
  left: 24px;
}

%right-space {
  right: 24px;
}

.notice {
  position: absolute;
  background-color: $white;
  max-width: 400px;
  border: 0;
  padding-top: 16px;
  padding: 16px 48px;
  margin-bottom: 24px;
  border-radius: 4px;

  &-top-left {
    @extend %top-space;
    @extend %left-space;
  }

  &-top-right {
    @extend %top-space;
    @extend %right-space;
  }

  &-bottom-left {
    @extend %bottom-space;
    @extend %left-space;
  }

  &-bottom-right {
    @extend %bottom-space;
    @extend %right-space;
  }

  &-icon {
    position: absolute;
    left: 12px;
  }

  &-action-close {
    position: absolute;
    cursor: pointer;
    color: rgba($black, $alpha-disabled);
    right: 12px;
    top: 12px;

    &:hover {
      color: rgba($black, $alpha-inactive);
    }
  }

  &-title,
  &-message {
    display: block;
    font-size: 1rem;
    line-height: 1.5;
    color: #3f3356;
  }

  &-title {
    margin-bottom: 8px;
    font-weight: 600;
  }

  &-message {
  }

  &-success {
    .notice-icon {
      color: $green;
    }
  }

  &-info {
    .notice-icon {
      color: $blue;
    }
  }

  &-warning {
    .notice-icon {
      color: $yellow;
    }
  }

  &-error {
    e-icon {
      color: $red;
    }
  }
}

.slide-horizontal-enter-active,
.slide-horizontal-leave-active {
  transition: opacity 0.3s ease-out;
}

.slide-horizontal-enter,
.slide-horizontal-leave-to {
  opacity: 0;
}

.slide-toggle-enter-active,
.slide-toggle-leave-active {
  transition: height 5s;
}
.slide-toggle-enter {
  height: 48px;
}
.slide-toggle-enter,
.slide-toggle-leave-to {
  height: 0;
}
</style>