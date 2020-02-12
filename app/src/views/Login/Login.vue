<template>
  <section class="section-no-header background-surface">
    <div class="login card-module">
      <Headline text="Login To Your Account" :level="2" class="mb-8" />
        <!-- :visible="alertOptions.visible" -->
      <Alert
        :visible="true"
        type="info"
        :closable="false"
        :message="$t('request-password-reset-success')"
        @on-dismiss="showAlert({ visible: false })"
      />
      <form ref="loginForm" @submit.prevent="onSubmit" novalidate="true">
        <div class="form-item">
          <Input
            label="Email Address"
            type="text"
            name="email"
            :className="[{'input-error': $v.email.$error}]"
            placeholder="name@example.com"
            :value="email"
            @on-input="onInput"
          />
        </div>
        <div class="form-item">
          <Input
            label="Password"
            type="password"
            name="password"
            :hasAction="true"
            :actionText="$t('forgot-password')"
            :actionRoute="'/auth/password/request-reset'"
            :value="password"
            :className="[{'input-error': $v.password.$error}]"
            placeholder="Enter 8 or more characters"
            @on-input="onInput"
          />
        </div>
        <Button :loading="isLoading" :disabled="$v.$invalid" size="large" :text="$t('login')" />
        <div class="mt-3 text-center">
          <span class="text-body mr-2">{{$t('no-account-create-one')}}</span>
          <Link :text="$t('sign-up')" to="/auth/sign-up" />
        </div>
      </form>
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
import { HttpStatus } from "../../enums";
import { Actions } from "../../store/actions";
import { Result } from "../../data/Result";
import {
  NotificationOptions,
  NotificationType
} from "../../components/Notification";

@Component({
  components: {
    Headline,
    Input,
    Button
  }
})
export default class Login extends Vue {
  isLoading = false;
  alertOptions: NotificationOptions = {};

  email: string = "";
  password: string = "";

  showAlert(options: NotificationOptions = { visible: false }) {
    this.alertOptions = options;
  }

  resetForm() {
    this.email = "";
    this.password = "";
  }

  @Validations()
  validations = {
    email: { required },
    password: { required }
  };

  async onSubmit() {
    const { $invalid } = this.$v;
    if (!$invalid) {
      // Start with loading a state
      this.isLoading = true;
      const response: Result = await this.$store.dispatch(
        Actions.AUTHENTICATE,
        {
          username: this.email,
          password: this.password
        }
      );
      // stop the loading indicator
      this.isLoading = false;
      if (response.status === HttpStatus.CREATED) {
        // reset form inputs
        this.resetForm();
        // Redirect to the home screen
        this.$router.replace("/");
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        // reset form inputs
        // Show alert
        this.showAlert({
          type: "error",
          message: this.$tc("http-error.invalid-credentials"),
          visible: true
        });
      } else if (response.status === HttpStatus.SERVICE_UNAVAILABLE) {
        // reset form inputs
        // Show alert
        this.showAlert({
          type: "error",
          message: this.$tc("http-error.service-unavailable"),
          visible: true
        });
      }
    }
  }

  onInput({ value, name }) {
    this[name] = value;
  }

  mounted() {
    if (this.$route.query.username) {
      this.email = this.$route.query.username.toString();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.login {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);

  max-width: 432px;
  margin: 0 auto;
  background-color: $white;
  padding: 2rem 0;
  height: 100%;

  @include phablet {
    height: initial;
    padding: 2rem 1.5rem;
    margin-top: 3rem;
    border: 1px solid $color-border;
    border-radius: 6px;
  }

  .button {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>