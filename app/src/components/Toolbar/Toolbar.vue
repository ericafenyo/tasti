<template>
  <header class="toolbar-wrapper">
    <div class="toolbar">
      <div class="logo">Tasti</div>
      <div class="toolbar-actions">
        <Icon name="search" />
        <Icon name="notification" />
      </div>
      <div class="toolbar-avatar">
        <Avatar size="small" :imageUrl="image" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import Avatar from "../Avatar/Avatar.vue";
import Icon from "../Icons/Icon.vue";

@Component({
  components: {
    Avatar,
    Icon
  }
})
export default class Toolbar extends Vue {
  image =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80";
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.toolbar-wrapper {
  height: 56px;
  width: 100%;
  background: $white;
  box-shadow: inset 0px -1px 0px $color-border;

  @include laptop {
    height: 64px;
  }

  .logo {
    flex: 1;
  }

  .toolbar {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    box-sizing: content-box;

    @include laptop {
      padding: 0 4rem;
    }

    &-actions {
      .icon {
        cursor: pointer;
        padding: 0.5rem;

        @include laptop {
          padding: 0.75rem;
        }
      }
    }

    &-avatar {
      padding-left: 0.5rem;
      cursor: pointer;
    }
  }
}
</style>