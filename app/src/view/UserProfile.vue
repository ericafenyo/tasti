<template>
  <div class="profile">
    <div class="user">
      <div class="user-avatar">
        <img
          class="image-fluid"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"
          alt="avatar"
        />
      </div>
      <div class="user-info">
        <h5 class="user-info-name">Nick Evans</h5>
        <p class="caption">Potato Master</p>
        <div class="user-info-popularity">
          <span class="caption">584 followers • 23k likes</span>
        </div>
      </div>
    </div>
    <div class="divider" />

    <div class="tabs-wrapper">
      <div class="tabs">
        <div class="tab tab-active">
          <div>Recipes</div>
        </div>
        <div class="tab">
          <div>Saved</div>
        </div>
        <div class="tab">
          <div>Following</div>
        </div>
      </div>
      <div class="tab-indicator" />
    </div>
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
import IconEdit from "../assets/icons/edit.svg";
export default {
  components: {
    IconEdit
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
      ]
    };
  },

  component: {
    name: ""
  }
};
</script>

<style lang="scss" scoped>
.profile {
  font-family: $font;
}
.user {
  display: flex;
  background: $white;
  padding: 24px 16px;
  &-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-info {
    margin-left: 16px;

    &-name {
      @include header-5;
      margin: 0;
      line-height: 1.5;
    }

    &-popularity {
      padding-top: 8px;
    }
  }
}

.divider {
  height: 1px;
  background-color: #e6e6e6;
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



