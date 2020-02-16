<template>
  <transition name="slide-horizontal">
    <div v-if="isVisible" :class="['alert', {'alert-closable' : closable}, composeAlertClasses]">
      <Icon :name="computeIcon" class="alert-icon" :size="18" />
      <span v-if="title" v-html="title" class="alert-title" />
      <span v-if="message" v-html="message" class="alert-message" />
      <Icon
        v-if="closable"
        class="alert-action-close"
        name="close"
        :size="20"
        @click.native="onDismiss"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import { IconOption } from "../Icons/Icon.vue";
import { NotificationType } from ".";

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
    } else {
      return "confirm";
    }
  }

  @Prop({ type: String, default: "success" })
  type: NotificationType;

  @Prop({ type: String, default: "" })
  title: string;

  @Prop({ type: String, default: "" })
  message: string;

  @Prop({ type: Boolean, default: false })
  visible: boolean;

  @Prop({ type: Boolean, default: true })
  closable: boolean;

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
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 42px;
  padding-right: 16px;
  margin-bottom: 24px;

  border-radius: 4px;
  background-color: $color-surface;

  &-icon {
    position: absolute;
    left: 13px;
    margin-top: 2px;
  }

  &-action-close {
    position: absolute;
    cursor: pointer;
    color: rgba($black, $alpha-disabled);
    right: 4px;
    padding: 8px;
    top: 5px;

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
    font-weight: 500;
  }

  &-message {
    font-size: 15px;
    font-weight: 500;
  }

  &-success {
    border-color: $green;
    background-color: rgba($green, 0.1);
    .alert-icon {
      color: $green;
    }
  }

  &-info {
    border-color: $blue;
    background-color: rgba($blue, 0.1);

    .alert-icon {
      color: $blue;
    }
  }

  &-warning {
    border-color: $orange;
    background-color: rgba($orange, 0.1);

    .alert-icon {
      color: $orange;
    }
  }

  &-error {
    border-color: $red;
    background-color: rgba($red, 0.1);
    .alert-icon {
      color: $red;
    }
  }

  &-closable {
    padding-right: 40px;
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