<template>
  <section class="profile">
    <template v-if="isLoading">
      <Loader class="h-full" />
    </template>
    <template v-else>
      <v-container>
        <div class="flex">
          <v-avatar class="border-4 mr-4" height="96" width="96" tile color="var(--grey-dark)">
            <img v-if="profile.avatarPath" :src="avatarUrl" alt="avatar" />
            <span v-else class="avatar-text">EA</span>
          </v-avatar>
          <div class="about-me">
            <h3 class="user--name">{{ profile.name }}</h3>
            <span v-if="profile.occupation" class="text-primary">Chef</span>
            <div class="d-flex caption mt-4">
              <div>
                <span class="mr-1 font-semibold">{{ profile.recipeCount }}</span>
                <span>{{$t('profile.recipes')}}</span>
              </div>
              <v-divider class="mx-4" vertical></v-divider>
              <div>
                <span class="mr-1 font-semibold">{{ profile.favoriteCount}}</span>
                <span>{{$t('profile.favorites')}}</span>
              </div>
              <v-divider class="mx-4" vertical></v-divider>
              <div>
                <span class="mr-1 font-semibold">{{ profile.followersCount }}</span>
                <span>{{$t('profile.followers')}}</span>
              </div>
              <v-divider class="mx-4" vertical></v-divider>
              <div>
                <span class="mr-1 font-semibold">{{ profile.followingCount }}</span>
                <span>{{$t('profile.following')}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="my-6">
          <Tabs :items="$t('profile-tabs')" />
          <div :style="{minHeight: '400px'}">
            <keep-alive>
              <component :is="tabComponent" />
            </keep-alive>
          </div>
        </div>
      </v-container>
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import EditProfile from "@/components/EditProfile/EditProfile.vue";
import RecipeList from "@/components/Recipe/List.vue";

import ContextMenu, {
  ContextMenuItemOption
} from "@/components/ContextMenu/ContextMenu.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import { IconOption } from "@/components/Icons/Icon.vue";
import { Actions } from "@/store/actions";
import { Result } from "@/data/Result";
import { HttpStatus } from "@/enums";
import { buildImageUrl } from "@/utils";

@Component({
  components: {
    Tabs,
    ContextMenu,
    EditProfile,
    RecipeList
  }
})
export default class Profile extends Vue {
  isLoading = true;
  profile: any = {};
  tabComponent = "RecipeList";

  get avatarUrl() {
    return buildImageUrl(this.profile.avatarPath);
  }

  showLoading(bool = true) {
    this.isLoading = bool;
  }

  handleError() {
    this.showLoading(false);
  }

  handleSuccess() {
    this.showLoading(false);
  }

  async mounted() {
    this.loadProfile();
  }

  async loadProfile() {
    const response: Result = await this.$store.dispatch(Actions.GET_PROFILE);
    if (response.status === HttpStatus.OK) {
      this.profile = response.data;
      this.isLoading = false;
    } else {
      this.isLoading = false;
      console.error(response);
    }
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

  onMenuItemClick() {}
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.user--name {
  font-size: 24px;
  font-family: var(--heading-font);
}

.layout {
  max-width: 1328px;
  display: grid;
  grid-template-columns: 284px 1fr;
}

.profile {
  height: 100%;
  max-width: 960px;
  margin: 0 auto;
  .aside-content {
    width: 290px;
    border-right: 1px solid rgb(230, 236, 241);
  }
}

.tabs-wrapper {
  margin-top: 24px;
  border-bottom: 1px solid #e6e6e6;
}
</style>
