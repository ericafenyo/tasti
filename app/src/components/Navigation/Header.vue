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
              <Avatar size="x-small" :src="user.avatarUrl" />
              <span class="navbar__profile-name">{{user.name}}</span>
            </div>
            <div role="button" class="navbar__profile-more">
              <Icon class="navbar__profile-more-icon" name="more-ver" />
            </div>
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
      width: 40px;
      height: 40px;
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
    height: 40px;
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