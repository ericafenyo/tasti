<template>
  <div class="profile">
    <div class="avatar">
      <img
        class="image-fluid"
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"
        alt="avatar"
      />
    </div>
    <div class="profile-info">
      <h2>Nick Evans</h2>
      <p>Potato Master</p>
      <div class="detail">
        <span>584 followers</span>
        <span>23k likes</span>
      </div>
    </div>

    <div class="recipes" v-for="(recipe, index) in recipes" :key="index">
      <Cookbook cookbook="cookbooks[index]" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookbooks: [
        {
          name: "some name",
          image: ""
        },
        {
          name: "some name",
          image: ""
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
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.profile {
  display: flex;
}
</style>



