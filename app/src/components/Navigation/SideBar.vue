<template>
  <div class="sidebar">
    <router-link class="logo" :to="{name: 'explore'}">
      <Icon name="logo" size="40" />
    </router-link>
    <nav class="h-full my-6">
      <ul class="nav h-full">
        <li
          v-for="(menu, index) in menuItems"
          :key="index"
          :class="['nav__item',{'active': (active === index)}]"
          @click="active = index"
        >
          <a class="nav-link">
            <Icon :name="menu.icon" size="24" />
          </a>
        </li>
      </ul>
    </nav>
    <!-- <div class="logout" @click="logout">
        <span class="icon-button">
          <Icon name="logout" size="24" />
        </span>
    </div>-->
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
    },
    {
      icon: "logout"
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
  background-color: var(--white);
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;

  .logo {
    display: flex;
    width: 80px;
    height: 80px;
    justify-content: center;
    align-items: center;
    color: #6286ed;
  }

  .nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__item {
      cursor: pointer;
      padding: 1.25rem 0;
      text-align: center;

      .icon {
        color: #718096;
      }

      &.active{
        background: #edf2f7;
        box-shadow: inset 3px 0px #2B6CB0;
      }

      &:last-child {
        margin-top: auto;
      }
    }

    &__link {
      .icon {
        color: #cbd5e0;
      }
    }
  }
}
</style>