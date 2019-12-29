<template>
  <div class="card-module">
    <div class="p-4">
      <div class="user">
        <div :style="{width:'100px', height: '100px'}">
          <Avatar username="NE" :src="image" />
        </div>

        <div class="user-info">
          <h5 class="user-info-name">Nick Evans</h5>
          <p class="caption">Potato Master</p>
        </div>
      </div>
      <div class="divider my-4"></div>
      <div class="stats">
        <div v-for="(stat, index) in stats" :key="index">
          <span class="stats-value">{{stat.value}}</span>
          <span class="stats-label">{{stat.text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import Avatar from "../Avatar/Avatar.vue";

@Component({
  components: {
    Avatar
  }
})
export default class ProfileStats extends Vue {
  image =
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=800&h=800&q=80";
  stats = [
    {
      value: "238",
      text: "Recipes"
    },
    {
      value: "20k",
      text: "Followers"
    },
    {
      value: "1.4k",
      text: "Following"
    }
  ];
}
</script>


<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.stats {
  display: flex;
  justify-content: space-between;

  span {
    display: block;
    text-align: center;
  }

  &-value {
    @include subtitle;
  }

  &-label {
    @include caption;
    line-height: 2;
  }
}

.user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  &-info {
    margin-top: 16px;
    &-name {
      @include header-3;
      margin: 0;
      line-height: 1.5;
    }

    &-popularity {
      padding-top: 24px;
    }
  }
}
</style>