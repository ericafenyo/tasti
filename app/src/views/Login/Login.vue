<template>
  <section class="section-no-header background-surface">
    <div class="login card-module">
      <div class="container">
        <Headline text="Login To Your Account" :level="3" class="mb-5" />
        <form @submit.prevent novalidate="true">
          <div class="form-item">
            <Input
              label="Email Address"
              type="text"
              name="email"
              :className="[{'input-error': $v.email.$error}]"
              placeholder="name@example.com"
              @on-input="onInput"
            />
          </div>
          <div class="form-item">
            <Input
              label="Password"
              type="password"
              name="password"
              :className="[{'input-error': $v.password.$error}]"
              placeholder="Enter 8 or more characters"
              @on-input="onInput"
            />
          </div>
          <Button text="Login" class="mb-3" type="primary" @on-click="onSubmit" />
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required } from "vuelidate/lib/validators";

import Headline from "@/components/Headline/Headline.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";

@Component({
  components: {
    Headline,
    Input,
    Button
  }
})
export default class Login extends Vue {
  email: string = "";
  password: string = "";

  @Validations()
  validations = {
    email: { required },
    password: { required }
  };

  async onSubmit() {
    const { $touch, $invalid } = this.$v;
    // Force the validation of form
    $touch();

    if (!$invalid) {
      try {
        const response = await this.$store.dispatch("authenticate", {
          username: this.email,
          password: this.password
        });

        if (response.status === 201) {
          this.$router.replace("/");
        }
      } catch (error) {
        console.error("There was an error while logging in -> " + error);
        console.log(error);
      }
    }
  }

  onInput({ value, name }) {
    this[name] = value;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.login {
  max-width: 560px;
  margin: 0 auto;
  background-color: $white;
  padding: 2rem 0;
  height: 100%;

  @include phablet {
    height: initial;
    padding: 2rem 1rem;
    margin-top: 3rem;
    border: 1px solid $color-border;
    border-radius: 12px;
  }

  .button {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>