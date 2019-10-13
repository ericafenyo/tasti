<template>
  <div class="register">
    <div class="register-wrapper">
      <div class="container">
        <Headline text="Create Account" :level="3" class="mb-4" />
        <ValidationObserver v-slot="{ invalid, passes }" slim>
          <form @submit.prevent class="form" novalidate="true">
            <Input
              label="Full name"
              type="text"
              name="name"
              :required="true"
              placeholder="What's your full name?"
              @on-input="onInput"
              validate="required"
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
              <div class="privacy-agreement my-3">
                <Checkbox>
                  Accept
                  <a href="#">Terms and Conditions</a>
                </Checkbox>
              </div>
            </div>
            <Button
              :disabled="invalid"
              text="Create Account"
              class="mb-3"
              type="primary"
              @on-click="onSubmit"
            />
            <div class="account-notice">
              <span class="text">Already have an account?</span>
              <a class="action-sign-in" href="#">Sign in</a>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input/Input";
import Headline from "@/components/Headline/Headline";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox";

export default {
  data: () => ({
    name: "",
    email: "",
    password: ""
  }),

  components: {
    Input,
    Headline,
    Button,
    Checkbox
  },

  methods: {
    onSubmit() {
      const { name, email, password } = this.$data;
      // If the form data is not null, dispatch an action
      // to create a new user account.
      console.log(name, email, password);
      if (name && email && password) {
        console.log(name, email, password);

        this.$store.dispatch("createUser", this.$data);
      }
    },

    onInput(value, name) {
      this.$data[name] = value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.register {
  background-color: $color-surface;
  height: 100vh;
  .register-wrapper {
    max-width: 480px;
    margin: 0 auto;
    background-color: $white;
    padding: 2rem 0;
    height: 100vh;

    @include phablet {
      height: unset;
    }

    @include laptop {
      padding: 2rem 1rem;
      border: 1px solid $color-border;
    }
  }

  @include laptop {
    padding-top: 4rem;
  }

  .account-notice {
    span {
      color: $color-primary-text;
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
