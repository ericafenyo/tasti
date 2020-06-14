<template>
  <header class="navbar">
    <div class="navbar__content">
      <template v-if="isAuthenticated">
        <div class="navbar__actions">
          <button class="navbar__actions-notification">
            <Icon size="18" class="navbar__actions-notification-icon" name="notification" />
          </button>
          <button class="navbar__actions-search">
            <Icon size="18" class="navbar__actions-search-icon" name="search" />
          </button>
          <div class="navbar__profile">
            <div class="flex items-center">
              <v-avatar size="32">
                <v-img aspect-ratio="1/1" :src="user.avatarUrl" />
              </v-avatar>
              <span class="navbar__profile-name">{{user.name}}</span>
            </div>
            <!-- <v-btn icon class="ml-2">
              <Icon class="navbar__profile-more-icon" name="more-ver" />
            </v-btn>-->
            <v-menu nudge-bottom="42" nudge-left="110">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="ml-2" icon v-bind="attrs" v-on="on">
                  <Icon name="more-ver" />
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="toDestination(item)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </template>
      <template v-if="!isAuthenticated">
        <div class="button-group">
          <span class="button-item">
            <Button
              size="small"
              :text="$t('login')"
              @on-click="() => {$router.push({name: 'sign-in'})}"
            />
          </span>
          <span class="button-item">
            <Button
              theme="success"
              type="outline"
              size="small"
              :text="$t('sign-up')"
              @on-click="() => {$router.push({name: 'sign-up'})}"
            />
          </span>
        </div>
      </template>
    </div>
  </header>
</template>


<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import Avatar from "../Avatar/Avatar.vue";
import Icon from "../Icons/Icon.vue";
import Button from "../Button/Button.vue";
import SearchBar from "../SearchBar/SearchBar.vue";

export type NavbarTheme = "light" | "transparent";

@Component({
  components: {
    Avatar,
    Icon,
    SearchBar,
    Button
  }
})
export default class Header extends Vue {
  items = [
    {
      id: "action-explore",
      title: "Explore"
    },
    {
      id: "action-profile",
      title: "Profile"
    },
    {
      id: "action-chats",
      title: "Chats"
    },
    {
      id: "action-settings",
      title: "Account Settings"
    },
    {
      id: "action-logout",
      title: "Log out"
    }
  ];

  toDestination(item: any) {
    console.log(item);
  }

  @Prop({ type: String, default: "transparent" })
  theme!: NavbarTheme;

  get isAuthenticated(): boolean {
    return this.$store.getters["user/isAuthenticated"];
  }

  get user() {
    return this.$store.getters["user/info"];
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.navbar {
  height: 80px;

  &__content {
    padding: 0 4.5rem;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__actions {
    display: inline-flex;

    &-notification,
    &-search {
      width: 42px;
      height: 42px;
      background-color: var(--white);
      border: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.5rem;

      .icon {
        color: rgba(23, 23, 23, 0.36);
      }
    }
  }

  &__profile {
    height: 42px;
    background-color: var(--white);
    display: inline-flex;
    align-items: center;
    padding: 0 0.5rem;

    &-name {
      margin-left: 0.5rem;
      font-family: var(--heading-font);
      font-size: 0.875em;
      letter-spacing: 0.25px;
      color: rgba(23, 23, 23, 0.55);
    }

    &-more {
      margin-left: 1.5rem;
      cursor: pointer;
      border: none;
    }
  }
}
</style>