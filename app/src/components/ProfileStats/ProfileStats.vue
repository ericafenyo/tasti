<template>
  <div class="stats-wrapper">
    <div class="p-4">
      <div class="user">
        <Avatar />
        <div class="user-info">
          <h5 class="user-info-name">Nick Evans</h5>
          <p class="caption">Potato Master</p>
          <div class="user-info-popularity">
            <span class="caption">584 followers • 23k likes</span>
          </div>
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

<script>
import Avatar from "../Avatar/Avatar";
export default {
  components: {
    Avatar
  },

  props: {
    stats: {
      type: Array,
      default: [
        {
          value: 20,
          text: "Recipe"
        },
        {
          value: 20,
          text: "Recipe"
        },
        {
          value: 20,
          text: "Recipe"
        }
      ]
    }
  }
};
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

  .stats-value {
    @include header-3;
  }

  .stats-label {
    opacity: 0.5;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: center;
    color: $hunter-green;
  }
}

.user {
  display: flex;
  &-info {
    margin-left: 16px;

    &-name {
      @include header-3;
      margin: 0;
      line-height: 1.5;
    }

    &-popularity {
      padding-top: 8px;
    }
  }
}
</style>