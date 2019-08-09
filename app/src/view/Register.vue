<template>
  <div class="register">
    <form class="form" @submit.prevent="submit">
      <label for="input-name" class="sign-up">
        Full name
        <input type="text" v-model="fullName"/>
      </label>
      <label for="input-name" class="sign-up">
        Email Address
        <input type="text" v-model="email" />
      </label>
      <label for="input-name" class="sign-up">
        Password
        <input type="password" v-model="password" />
      </label>

      <button type="submit">Create Account</button>
    </form>
  </div>
</template>

<script>

export default {
  name: "Register",
  data: () => ({
    fullName: "",
    email: "",
    password: ""
  }),

  methods: {
    submit(event) {
      console.log(this.$data);
    }
  }
};
</script>

<style lang="scss" scoped>
.register * {
  display: block;
}
</style>


