<template>
  <header class="header">
    <div class="container">
      <div class="flex justify-between">
      <div class="flex items-center">
        <div class="logo">
          <Icon name="restaurant" color="white" width="20" />
        </div>
        <!-- <SearchBar class="mx-4" /> -->
      </div>
      <div class="inline-flex items-center">
        <!-- <div>
          <Icon name="notification" />
        <Avatar username="JD" :src="image" inline="true" />
        </div> -->
        <div class="button-group">
          <span class="button-item">
               <Button size="small" type="outline" :text="$t('login')" @on-click="() => {$router.replace({name: 'sign-in'})}" />
          </span>
           <span class="button-item">
               <Button size="small" :text="$t('sign-up')" @on-click="() => {$router.replace({name: 'sign-up'})}"/>
          </span>
        </div>
      </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import Avatar from "../Avatar/Avatar.vue";
import Icon from "../Icons/Icon.vue";
import Button from "../Button/Button.vue"
import SearchBar from "../SearchBar/SearchBar.vue";

@Component({
  components: {
    Avatar,
    Icon,
    SearchBar,
    Button
  }
})
export default class NavigationBar extends Vue {
  image =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80";
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.header {
  height: 56px;
  z-index: 10;
  width: 100%;
  background: $white;
  box-shadow: inset 0px -1px 0px $color-border;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @include laptop {
    height: 64px;
  }

  .logo {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-accent;
    border-radius: 16px;
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