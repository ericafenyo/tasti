<template>
  <div class="register">
    <div class="register-wrapper">
      <div class="container">
        <Headline text="Create a Free Account" :level="3" class="mb-4" />
        <form @submit.prevent class="form" novalidate="true">
          <div class="form-column">
            <div class="form-item">
              <Input
                label="First Name"
                type="text"
                name="first-name"
                required="true"
                :className="[{'input-error': $v.formData.firstName.$error}]"
                placeholder="John"
                @on-input="onInput"
              />
            </div>

            <div class="form-item">
              <Input
                label="Last Name"
                type="text"
                name="last-name"
                required="true"
                :className="[{'input-error': $v.formData.lastName.$error}]"
                placeholder="Doe"
                @on-input="onInput"
              />
            </div>
          </div>

          <div class="form-item">
            <Input
              label="Email Address"
              type="text"
              name="email"
              :className="[{'input-error': $v.formData.email.$error}]"
              placeholder="name@example.com"
              @on-input="onInput"
            />
          </div>
          <div class="form-item">
            <Input
              label="Password"
              type="password"
              name="password"
              :className="[{'input-error': $v.formData.password.$error}]"
              placeholder="Enter 8 or more characters"
              @on-input="onInput"
            />
          </div>

          <div class="form-item">
            <div class="privacy-agreement">
              <Checkbox>
                Accept
                <a href="#">Terms and Conditions</a>
              </Checkbox>
            </div>
          </div>
          <Button text="Create Account" class="mb-3" type="primary" @on-click="onSubmit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required, email, minLength } from "vuelidate/lib/validators";
import camelCase from "lodash/camelCase";

import Headline from "@/components/Headline/Headline.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import Checkbox from "@/components/Checkbox.vue";

@Component({
  components: {
    Headline,
    Input,
    Button,
    Checkbox
  }
})
export default class Register extends Vue {
  formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  @Validations()
  validations = {
    formData: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  };

  async onSubmit() {
    const { $touch, $invalid } = this.$v;
    // Force the validation of form
    $touch();

    if (!$invalid) {
      try {
        await this.$store.dispatch("createUser", this.formData);
        this.$router.replace("login");
      } catch (error) {
         throw new Error("There was an error while signing up");
      }
    }
  }

  onInput({ value, name }) {
    this.formData[camelCase(name)] = value;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.register {
  background-color: $color-surface;
  height: 100vh;
  .register-wrapper {
    max-width: 560px;
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

  .button {
    width: 100%;
    margin-top: 1rem;
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

.form-column {
  @include laptop {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }
}
</style>
