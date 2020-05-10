<template>
  <section class="profile">
    <template v-if="isLoading">
      <Loader class="h-full" />
    </template>
    <div v-if="!isLoading" class="layout h-full">
      <aside class="aside-content">
        <ProfileStats :args="profile" class="m-4" />
      </aside>
      <main class="main-content">
        <div class="m-4">
          <Tabs :items="$t('profile-tabs')" @on-change="loadData" />
        </div>
        <div></div>
      </main>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import ProfileStats from "../../components/ProfileStats/ProfileStats.vue";
import Cookbook from "@/components/Cookbook/Cookbook.vue";
import EditProfile from "@/components/EditProfile/EditProfile.vue";
import Loader from "../../components/Loader.vue";

import ContextMenu, {
  ContextMenuItemOption
} from "../../components/ContextMenu/ContextMenu.vue";
import Tabs from "../../components/Tabs/Tabs.vue";
import { IconOption } from "../../components/Icons/Icon.vue";
import { Actions } from "../../store/actions";
import { Observable } from "rxjs";
import { Result, Status } from "../../data/Result";

@Component({
  components: {
    ProfileStats,
    Tabs,
    Cookbook,
    ContextMenu,
    EditProfile,
    Loader
  }
})
export default class Profile extends Vue {
  isLoading = false;
  profile = {};

  showLoading(bool = true) {
    this.isLoading = bool;
  }

  handleError() {
    this.showLoading(false);
  }

  handleSuccess() {
    this.showLoading(false);
  }

  // async loadData({ key }) {
  //   const response = await this.$store.dispatch(Actions.GET_FOLLOWERS);
  //   console.log(response);
  // }

  async mounted() {
    const response = await this.$store.dispatch(Actions.GET_PROFILE);
    this.profile = response.data;
  }

  addRecipe = false;

  items = ["Cookbooks", "Collection"];
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

  // active(value) {
  //   console.log(value);
  // }
  onMenuItemClick() {}
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.layout {
  max-width: 1328px;
  display: grid;
  grid-template-columns: 284px 1fr;
}

.profile {
  height: 100%;
  .container {
    padding: 0;
  }
  max-width: 1328px;
  margin: 0 auto;
  .aside-content {
    width: 290px;
    border-right: 1px solid rgb(230, 236, 241);
  }

  .main-content {
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
