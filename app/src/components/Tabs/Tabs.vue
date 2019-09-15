<template>
  <div class="tabs">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      :class="{'tabs-item-active' : (index === active )}"
      class="tabs-item"
      @click="onClick(index)"
    >{{tab}}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 0
  }),

  props: {
    tabs: {
      type: Array,
      default: () => ["Tab 1", "Tab2"]
    }
  },

  mounted() {
    this.$emit("active", this.active);
  },

  watch: {
    /**
     * Emits a action when the active tab is changed
     * @params{number} the active tab index
     */
    active(value) {
      this.$emit("on-change", value);
    }
  },

  methods: {
    onClick(index) {
      this.active = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_resources";

.tabs {
  display: flex;
  align-items: center;
  background: $white;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid transparent;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 13px;
  transition: background-color 0.2s linear, color 0.2s linear;

  @include laptop {
    cursor: pointer;
  }

  &-item {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1px;
    font-weight: 600;
    align-self: stretch;
    color: $black;

    &-active {
      background: $color-accent;
      color: $white;
    }
  }
}
</style>