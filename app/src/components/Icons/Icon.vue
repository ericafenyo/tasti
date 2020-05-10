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
import IconCritical from "./IconCritical.vue";
import IconConfirm from "./IconConfirm.vue";
import IconWarning from "./IconWarning.vue";
import IconPerson from "./IconPerson.vue";
import IconDonut from "./IconDonut.vue";
import IconChat from "./IconChat.vue";
import IconMoreVer from "./IconMoreVer.vue";
import IconOverview from "./IconOverview.vue";
import IconList from "./IconList.vue";
import IconGrid from "./IconGrid.vue";
import IconSort from "./IconSort.vue";
import IconExplore from "./IconExplore.vue";
import IconDashboard from "./IconDashboard.vue";
import IconCroissant from "./IconCroissant.vue";
import IconLogo from "./IconLogo.vue";

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
  | "critical"
  | "confirm"
  | "warning"
  | "clock"
  | "donut"
  | "chat"
  | "more-ver"
  | "overview"
  | "person"
  | "list"
  | "grid"
  | "explore"
  | "sort"
  | "croissant"
  | "logo"
  | "dashboard";

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
    IconCritical,
    IconConfirm,
    IconClock,
    IconWarning,
    IconPerson,
    IconChat,
    IconDonut,
    IconMoreVer,
    IconOverview,
    IconList,
    IconGrid,
    IconSort,
    IconExplore,
    IconDashboard,
    IconCroissant,
    IconLogo,
  }
})
export default class Icon extends Vue {
  @Prop({ type: String, default: "edit" })
  readonly name!: IconOption;

  @Prop({ type: [String, Number], default: 16 })
  readonly size!: string | number;

  get computeIcon(): string {
    return camelCase(`icon-${this.name}`);
  }
}
</script>
