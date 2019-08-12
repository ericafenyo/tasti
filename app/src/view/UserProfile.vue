<template>
  <div class="profile">
    <div class="avatar-wrapper">
      <img src alt="avatar" />
    </div>
    <div class="profile-info">
      <h2>Nick Evans</h2>
      <p>Potato Master</p>
      <div class="detail">
        <span>584 followers</span>
        <span>23k likes</span>
      </div>
    </div>

    <div class="recipes" v-for="(recipe, index) in recipes" key="index">
        <Recipe recipe = recipes[index]/>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      recipes: [
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



