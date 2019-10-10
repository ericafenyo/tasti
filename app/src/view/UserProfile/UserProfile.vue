<template>
  <div class="profile">
    <ProfileStats :stats="stats" class="m-3" />
    <Tabs :tabs="tabs" class="mx-3 my-2" @active="active" />
    <div class="cookbooks">
      <div class="container px-3">
        <div class="row">
          <div
            class="col-xs-12 col-md-6 col-lg-4 mb-3"
            v-for="cookbook in cookbooks"
            :key="cookbook.id"
          >
            <Cookbook :cookbook="cookbook" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProfileStats } from "@tasti/core";
import Cookbook from "@/components/Cookbook/Cookbook.vue";

import Tabs from "@tasti/tabs";

export default {
  components: {
    ProfileStats,
    Tabs,
    Cookbook
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
          recipeCount: 20,
          imageUrl:
            "https://images.unsplash.com/photo-1487376318617-f43c7b41e2e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        },
        {
          id: 2,
          name: "Chocolates",
          recipeCount: 68,
          imageUrl:
            "https://images.unsplash.com/photo-1472452049192-db15def0be25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1681&q=80"
        },
        {
          id: 3,
          name: "Sweets",
          recipeCount: 2,
          imageUrl:
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
