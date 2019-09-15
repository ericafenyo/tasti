<template>
  <div class="profile">
    <ProfileStats :stats="stats" />
    <Tabs :tabs="tabs" class="mx-2 my-2" @active="active" />
    <div class="cookbooks">
      <div class="container">
        <div class="row">
          <div class="col-xs-12" v-for="cookbook in cookbooks" :key="cookbook.id">
            <div class="cookbook">
              <div class="cookbook-thumbnail">
                <img :src="cookbook.image" alt="thumbnail" />
              </div>
              <div class="cookbook-name">{{cookbook.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProfileStats } from "@tasti/core";
import Tabs from "@tasti/tabs";

export default {
  components: {
    ProfileStats,
    Tabs
  },

  methods: {
    active(value) {
      console.log(value);
    }
  },

  data() {
    return {
      cookbooks: [
        {
          id: 1,
          name: "Italian",
          image:
            "https://images.unsplash.com/photo-1487376318617-f43c7b41e2e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        },
        {
          id: 2,
          name: "Chocolates",
          image:
            "https://images.unsplash.com/photo-1472452049192-db15def0be25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1681&q=80"
        },
        {
          id: 3,
          name: "Sweets",
          image:
            "https://images.unsplash.com/photo-1522248105696-9625ba87de6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80"
        }
      ],

      stats: [
        {
          value: 20,
          text: "Recipe"
        },
        {
          value: 75,
          text: "Saved"
        },
        {
          value: 248,
          text: "Following"
        }
      ],

      tabs: ["Cookbooks", "Collection"]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.profile {
  background-color: #f4f7f9;
  display: flex;
  flex-direction: column;

  .stats-wrapper {
    display: inline-block;
    background: $white;
    margin: 8px;
    border-radius: 4px;
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

.cookbook {
  box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08),
    0 1px 3px 1px rgba(60, 64, 67, 0.16);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 16px;
  &-thumbnail img {
    width: 100%;
    height: 100%;
  }

  &-name {
    text-align: center;
    line-height: 1.8;
  }
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
      color: rgba($hunter-green, 0.4);
      &-active {
        color: $hunter-green;
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
