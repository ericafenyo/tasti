<template>
  <div class="sidebar">
    <router-link class="logo" :to="{name: 'explore'}">
      <Icon name="logo" size="40" />
    </router-link>
    <div class="sidebar__actions">
      <nav>
        <ul class="menu">
          <li
            v-for="(menu, index) in menuItems"
            :key="index"
            :class="['menu-item',{'menu-item__active': (active === index)}]"
            @click="active = index"
          >
            <a class="icon-button">
              <Icon :name="menu.icon" size="24" />
            </a>
          </li>
        </ul>
      </nav>
      <div class="logout" @click="logout">
        <span class="icon-button">
          <Icon name="logout" size="24" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Actions } from "../../store/actions";

@Component
export default class SideBar extends Vue {
  active: number = 0;
  menuItems = [
    {
      icon: "dashboard"
    },
    {
      icon: "chat"
    },
    {
      icon: "person"
    },
    {
      icon: "settings"
    }
  ];

  logout() {
    this.$store.dispatch(Actions.LOGOUT_USER);
    this.$router.replace({ name: "sign-in" });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.sidebar {
  width: 80px;
  height: 100%;
  background-color: $white;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  padding: 1rem 0;

  .logo {
    width: 80px;
    height: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #6286ed;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .menu {
      margin: 2rem 0;
    }
  }
}

.menu-item {
  cursor: pointer;
  padding: 1.25rem;

  &.active .icon-button {
    background: $indigo;
    color: $white;
  }
}

.icon-button {
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background-color: #f7f7f7;
  color: #8f92a1;

  &:hover {
    background: $indigo;
    color: $white;
  }

  &:active {
    background: $indigo-dark;
    color: $white;
  }
}
</style>