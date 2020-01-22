<template>
  <section class="profile">
    <div class="container h-full">
      <div class="layout h-full">
        <aside class="aside-content">
          <ProfileStats :stats="stats" class="mr-3" />
          <div class="card-module my-4 mr-3">
            <ContextMenu :items="menuItems" @on-click="onMenuItemClick" />
          </div>
          <div @click.prevent="createNewRecipe" class="flex items-center justify-between">
            <span>New</span>
            <Icon name="add" />
          </div>
        </aside>

        <main class="main-content">
          <!-- <Tabs /> -->
          <!-- <div class="flex flex-wrap mt-3">
            <div v-for="(recipe, index) in 4" :key="index">
              <Recipe />
            </div>
          </div> -->
        </main>

        <!-- <aside class="aside-content">
          <ProfileStats :stats="stats" />
        </aside>-->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import ProfileStats from "../../components/ProfileStats/ProfileStats.vue";
import Cookbook from "@/components/Cookbook/Cookbook.vue";
import EditProfile from "@/components/EditProfile/EditProfile.vue";
import CreateRecipeTemplate from "../../components/CreateRecipeTemplate.vue";

import ContextMenu, {
  ContextMenuItemOption
} from "../../components/ContextMenu/ContextMenu.vue";
import Tabs from "../../components/Tabs/Tabs.vue";
import { IconOption } from "../../components/Icons/Icon.vue";
@Component({
  components: {
    ProfileStats,
    Tabs,
    Cookbook,
    ContextMenu,
    EditProfile,
    CreateRecipeTemplate
  }
})
export default class UserProfile extends Vue {
  addRecipe = false;

  tabs = ["Cookbooks", "Collection"];
  menuItems: ContextMenuItemOption[] = [
    {
      text: "Settings",
      icon: "settings"
    },
    {
      text: "Log Out",
      icon: "logout"
    }
  ];

  createNewRecipe() {}

  active(value) {
    console.log(value);
  }
  onMenuItemClick() {}
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.layout {
  display: grid;
  grid-template-columns: 284px 1fr;
}

.profile {
  background-color: $color-surface;
  height: 100%;
  .container {
    padding: 0;
  }

  .aside-content{
    border-right: 1px solid rgb(230, 236, 241);
  }

  .main-content{
    background-color: $white;
    height: 100%;
  }

  .stats-wrapper {
    //   display: inline-block;
    background: $white;
    // margin: 8px;
    border-radius: 3px;
  }

  &-stats {
    display: flex;
    margin: 24px 16px;
    border-bottom: 1px solid #000;
  }
}

.cookbooks {
  padding: 24px 0 0 0;
}

.tabs-wrapper {
  margin-top: 24px;
  border-bottom: 1px solid #e6e6e6;

  .tabs {
    position: relative;
    display: flex;
    line-height: 2;
    &::after {
      content: "";
      position: absolute;
    }
    .tab {
      flex: 1;
      text-align: center;
      color: rgba($color-accent, 0.4);
      &-active {
        color: $color-accent;
        @include lead;
      }
    }
  }
}

.tab-indicator {
  height: 3px;
  width: calc(100% / 3);
  background-color: $green;
  border-radius: 1px;
  transform: translate3d(0px, 0px, 0px);
}
</style>
