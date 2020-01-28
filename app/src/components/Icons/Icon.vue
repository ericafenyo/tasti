<template>
  <IconBase :icon-name="name" :size="size" @on-click="(event)=>$emit('on-click', event)">
    <component :is="computeIcon" />
  </IconBase>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import camelCase from "lodash/camelCase";

import IconBase from "./IconBase.vue";

import IconAdd from "./IconAdd.vue";
import IconArrowDown from "./IconArrowDown.vue";
import IconArrowLeft from "./IconArrowLeft.vue";
import IconArrowRight from "./IconArrowRight.vue";
import IconArrowUp from "./IconArrowUp.vue";
import IconArrowForward from "./IconArrowForward.vue";
import IconArrowBack from "./IconArrowBack.vue";
import IconClose from "./IconClose.vue";
import IconDelete from "./IconDelete.vue";
import IconEdit from "./IconEdit.vue";
import IconFilter from "./IconFilter.vue";
import IconLike from "./IconLike.vue";
import IconLogout from "./IconLogout.vue";
import IconMessage from "./IconMessage.vue";
import IconNotification from "./IconNotification.vue";
import IconPlay from "./IconPlay.vue";
import IconSearch from "./IconSearch.vue";
import IconSettings from "./IconSettings.vue";
import IconTimer from "./IconTimer.vue";
import IconUpload from "./IconUpload.vue";
import IconVisibility from "./IconVisibility.vue";
import IconVisibilityOff from "./IconVisibilityOff.vue";
import IconRestaurant from "./IconRestaurant.vue";
import IconInfo from "./IconInfo.vue";
import IconClock from "./IconClock.vue";

export type IconOption =
  | "add"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "arrow-forward"
  | "arrow-back"
  | "close"
  | "delete"
  | "edit"
  | "filter"
  | "like"
  | "logout"
  | "message"
  | "notification"
  | "play"
  | "search"
  | "settings"
  | "timer"
  | "upload"
  | "visibility"
  | "restaurant"
  | "info"
  | "visibility-off"
  | "clock";

@Component({
  components: {
    IconBase,
    IconAdd,
    IconArrowDown,
    IconArrowLeft,
    IconArrowRight,
    IconArrowUp,
    IconArrowForward,
    IconArrowBack,
    IconClose,
    IconDelete,
    IconEdit,
    IconFilter,
    IconLike,
    IconLogout,
    IconMessage,
    IconNotification,
    IconPlay,
    IconSearch,
    IconSettings,
    IconTimer,
    IconUpload,
    IconVisibility,
    IconVisibilityOff,
    IconRestaurant,
    IconInfo,
    IconClock
  }
})
export default class Icon extends Vue {
  @Prop({ type: String, default: "edit" })
  readonly name: IconOption;

  @Prop({ type: Number, default: 16 })
  readonly size: number;

  get computeIcon(): string {
    return camelCase(`icon-${this.name}`);
  }
}
</script>
