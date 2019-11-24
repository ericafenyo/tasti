<template>
  <header class="header">
    <div class="logo">
      <Logo color="white"  width="34"/>
    </div>
    <SearchBar class="flex-1 mx-4" />
    <Avatar username="JD" :src="image" inline="true" />
    <!-- <div>
        <div class="header-avatar d-flex">
          <Icon name="notification" />
         
        </div>
    </div>-->
  </header>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import Avatar from "../Avatar/Avatar.vue";
import Icon from "../Icons/Icon.vue";
import SearchBar from "../SearchBar/SearchBar.vue";
import Logo from "../../assets/icons/logo.svg";

@Component({
  components: {
    Avatar,
    Icon,
    SearchBar,
    Logo
  }
})
export default class Toolbar extends Vue {
  image =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80";
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.header {
  height: 56px;
  width: 100%;
  background: $white;
  box-shadow: inset 0px -1px 0px $color-border;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @include laptop {
    height: 80px;
  }

  .logo {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-accent;
    border-radius: 4px;
  }

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
</style>