<template>
  <div class="register">
    <div class="register-wrapper">
      <div class="container">
        <Headline text="Create Account" level="3" class="mb-4" />
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

          <div class="form-group">
            <div class="emailing-agreement my-3">
              <Checkbox>
                Accept
                <a href="#">Terms and Conditions</a>
              </Checkbox>
            </div>
          </div>
          <Button text="Create Account" class="mb-3" type="primary" />
          <div class="account-notice">
            <span class="text">Already have an account?</span>
            <a class="action-sign-in" href="#">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../../components/Input/Input";
import Text from "../../components/Text/Text";
import Headline from "../../components/Headline/Headline";
import Button from "@/components/Button/Button";
import Checkbox from "../../components/Checkbox";

export default {
  name: "Register",
  data: () => ({
    name: "",
    email: "",
    password: ""
  }),

  components: {
    Input,
    Headline,
    Button,
    Text,
    Checkbox
  },

  methods: {
    submit(event) {
      const { name, email, password } = this.$data;
      if (name && email && password) {
        this.$store.dispatch("createUser", this.$data);
      }
    },

    onInput(value) {
      this.$data[name] = value;
      console.log(value);
      // console.log(fields);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.register {
  .register-wrapper {
    max-width: 480px;
    margin: 0 auto;
    background-color: #f9fafb;
    padding: 2em 0;
    height: 100vh;

    @include phablet {
      margin-top: 48px;
      height: unset;
    }
  }

  .title {
    font-family: Rubik;
    font-size: 24px;
    font-weight: normal;
    margin: 48px 0;
    text-align: center;
    color: $charcoal;
  }

  .account-notice {
    span {
      color: $brown-grey-two;
    }

    .action-sign-in {
      color: #30be76;
      font-size: 16px;
      margin: 0 8px;
    }
  }
}

@media screen and (max-width: 578px) {
  .register- {
    margin: 0 !important;
  }
}

.mb-3 {
  margin-bottom: 24px;
}

.mt-5 {
  margin-top: 48px;
}
</style>