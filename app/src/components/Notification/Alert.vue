<template>
  <transition name="slide-horizontal">
    <div v-if="isVisible" class="alert" :class="composeAlertClasses">
      <Icon name="info" class="alert-icon" />
      <span v-if="title" v-html="title" class="alert-title" />
      <span v-if="message" v-html="message" class="alert-message" />
      <Icon class="alert-action-close" name="close" @on-click="onDismiss" />
    </div>
  </transition>
</template>

<script lang="ts">
export type AlertOptions = "success" | "info" | "warning" | "error";

import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import { IconOption } from "../Icons/Icon.vue";

@Component
export default class Alert extends Vue {
  isVisible = true;
  className = "";

  @Prop({ type: String, default: "success" })
  type: AlertOptions;

  @Prop({ type: String, default: "" })
  title: string;

  @Prop({ type: String, default: "" })
  message: string;

  @Prop({ type: Boolean, default: false })
  visible: boolean;

  @Emit("onDismiss")
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
  border: 1px solid;
  padding-top: 16px;
  padding: 16px 48px;
  margin-bottom: 24px;
  border-radius: 4px;

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
    color: #3F3356;
  }

  &-title {
    margin-bottom: 8px;
    font-weight: 600;
  }

  &-message {
  }

  &-success {
    background-color: $green-disabled;
    border-color: $green;

    .alert-icon {
      color: $green;
    }
  }

  &-info {
    background-color: $blue-disabled;
    border-color: $blue;

    .alert-icon {
      color: $blue;
    }
  }

  &-warning {
    background-color: $yellow-disabled;
    border-color: $yellow;

    .alert-icon {
      color: $yellow;
    }
  }

  &-error {
    background-color: $red-disabled;
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