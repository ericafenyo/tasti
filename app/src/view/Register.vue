<template>
  <div class="register">
    <h1 class="title">Creae an account</h1>
    <form class="form" @submit.prevent="submit" novalidate="true">
      <Input
        label="Full name"
        type="text"
        name="name"
        placeholder="What's your full name?"
        @on-input="onInput"
        validate="required|min:3"
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="you@example.com"
        @on-input="onInput"
        validate="required|email"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter 8 or more characters"
        @on-input="onInput"
        validate="required|min:8"
      />
      <button class="button button-primary mb-3" type="submit">Create Account</button>
      <div class="account-notice">
        <span>Already have an account?</span>
        <button>Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import Input from "../components/Input";

export default {
  name: "Register",
  data: () => ({
    name: "",
    email: "",
    password: ""
  }),

  components: {
    Input
  },

  methods: {
    submit(event) {
      const { name, email, password } = this.$data;
      if (name && email && password) {
        this.$store.dispatch("createUser", this.$data);
      }
    },

    onInput({ name, value }, fields) {
      this.$data[name] = value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";
.register {
  padding: 1em;

  .title {
    font-family: Rubik;
    font-size: 24px;
    font-weight: normal;
    margin: 48px 0;
    text-align: center;
    color: $charcoal;
  }

  .account-notice {
    text-align: center;
    span {
      color: $brown-grey-two;
    }

    button {
      color: #30be76;
      font-size: 16px;
    }
  }
}

.button {
  padding: 0 16px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: $green;
  border: 1px solid $green;
  color: $white;
  font-size: 1em;
}

.mb-3 {
  margin-bottom: 24px;
}
</style>