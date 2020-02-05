<template>
  <transition name="slide-horizontal">
    <div v-if="isVisible" class="alert" :class="composeAlertClasses">
      <Icon :name="computeIcon" class="alert-icon" :size="18" />
      <span v-if="title" v-html="title" class="alert-title" />
      <span v-if="message" v-html="message" class="alert-message" />
      <Icon class="alert-action-close" name="close" :size="20" @click.native="onDismiss" />
    </div>
  </transition>
</template>

<script lang="ts">
export type AlertType = "success" | "info" | "warning" | "error";

export interface AlertOptions {
  type?: AlertType;
  title?: string;
  message?: string;
  visible?: boolean;
}

import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import { IconOption } from "../Icons/Icon.vue";

@Component
export default class Alert extends Vue {
  isVisible = true;
  className = "";

  get computeIcon(): IconOption {
    const { type } = this;
    if (type === "success") {
      return "confirm";
    } else if (type === "info") {
      return "info";
    } else if (type === "warning") {
      return "warning";
    } else if (type === "error") {
      return "critical";
    }
  }

  @Prop({ type: String, default: "success" })
  type: AlertType;

  @Prop({ type: String, default: "" })
  title: string;

  @Prop({ type: String, default: "" })
  message: string;

  @Prop({ type: Boolean, default: false })
  visible: boolean;

  @Emit("on-dismiss")
  emitOnDismiss() {}

  @Watch("visible", { immediate: true })
  onShowAlert(show) {
    this.isVisible = show;
  }

  onDismiss() {
    this.isVisible = false;
    this.emitOnDismiss();
  }

  get composeAlertClasses(): string {
    return `alert-${this.type}`;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.alert {
  position: relative;
  border-left: 4px solid;
  padding-top: 16px;
  padding: 16px 48px;
  margin-bottom: 24px;
  border-radius: 4px;
  background-color: $color-surface;

  &-icon {
    position: absolute;
    left: 16px;
    margin-top: 2px;
  }

  &-action-close {
    position: absolute;
    cursor: pointer;
    color: rgba($black, $alpha-disabled);
    right: 4px;
    padding: 8px;
    top: 8px;

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
    border-color: $green;
    .alert-icon {
      color: $green;
    }
  }

  &-info {
    border-color: $blue;

    .alert-icon {
      color: $blue;
    }
  }

  &-warning {
    border-color: $orange;

    .alert-icon {
      color: $orange;
    }
  }

  &-error {
    border-color: $red;
    .alert-icon {
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