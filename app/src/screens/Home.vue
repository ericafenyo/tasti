<template>
  <div class="home-page">
    <aside>
      <SideBar />
    </aside>
    <main class="main-content">
      <Header />
      <router-view :key="$route.path" />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import Header from "@/components/Navigation/Header.vue";
import SideBar from "@/components/Navigation/SideBar.vue";

@Component({ components: { Header, SideBar } })
export default class Home extends Vue {
  mounted() {
    this.$router.replace({ name: "explore" });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.home-page {
  display: flex;
  background: $color-surface;
  height: 100%;

  .main-content {
    width: 100%;
  }
}
</style>