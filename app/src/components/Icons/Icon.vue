<template>
  <IconBase :icon-name="name">
    <component :is="computeIcon" />
  </IconBase>
</template>

<script>
import IconBase from "./IconBase.vue";

import IconAdd from "./IconAdd.vue";
import IconArrowDown from "./IconArrowDown.vue";
import IconArrowLeft from "./IconArrowLeft.vue";
import IconArrowRight from "./IconArrowRight.vue";
import IconArrowUp from "./IconArrowUp.vue";
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

export default {
  components: {
    IconBase,
    IconAdd,
    IconArrowDown,
    IconArrowLeft,
    IconArrowRight,
    IconArrowUp,
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
    IconUpload
  },

  props: {
    name: {
      type: String,
      default: "edit"
    }
  },

  methods: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  computed: {
    computeIcon() {
      const name = this.capitalize(this.name);
      return `Icon${name}`;
    }
  }
};
</script>
