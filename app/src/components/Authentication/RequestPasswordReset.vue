<template>
  <section class="section-no-header background-surface">
    <div class="request-reset">
      <Headline :text="$t('forgot-your-password')" :level="2" />
      <p class="text-body mt-2 mb-8">{{$t('request-password-reset')}}</p>
      <Alert
        :type="options.type"
        :message="options.message"
        :visible="options.visible"
        :style="{marginTop: '-1rem'}"
        @on-dismiss="hideNotification()"
      />
      <form @submit.prevent="onSubmit" novalidate="true">
        <div class="form-item">
          <Input
            type="text"
            name="email"
            placeholder="name@example.com"
            :label="$t('label.email')"
            :value="email"
            @on-input="onInput"
          />
        </div>
        <Button
          size="large"
          :text="$t('action.reset-password')"
          :loading="isLoading"
          :disabled="$v.$invalid"
        />
        <div class="mt-3 text-center">
          <span class="text-body mr-2">{{$t('just-remembered')}}</span>
          <Link :text="$t('login')" to="/auth/sign-in" />
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";
import { Result } from "../../data/Result";
import { Actions } from "../../store/actions";
import { HttpStatus } from "../../enums";
import { NotificationOptions } from "../Notification";

@Component
export default class RequestPasswordReset extends Vue {
  email: string = "";
  isLoading: boolean = false;
  options: NotificationOptions = {};

  @Validations()
  validations = {
    email: { required, email }
  };

  onInput({ value, name }) {
    this[name] = value;
  }

  resetForm() {
    this.email = "";
  }

  hideNotification() {
    this.options = { visible: false };
  }

  async onSubmit(event) {
    const { $invalid } = this.$v;
    if (!$invalid) {
      // Start with a loading state
      this.isLoading = true;

      const response: Result = await this.$store.dispatch(
        Actions.REQUEST_PASSWORD_RESET,
        this.email
      );

      // stop the loading indicator
      this.isLoading = false;

      switch (response.status) {
        case HttpStatus.CREATED:
          this.redirectToLoginScreen();
          break;

        case HttpStatus.NOT_FOUND:
          this.redirectToLoginScreen();
          break;

        case HttpStatus.SERVICE_UNAVAILABLE:
          // Notice the user about the error.
          this.options = {
            type: "error",
            visible: true,
            message: this.$tc("http-error.service-unavailable")
          };
      }
    }
  }

  private redirectToLoginScreen() {
    this.$router.replace({
      name: "sign-in",
      params: {
        username: this.email,
        notificationKey: "request-password-reset-success"
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.request-reset {
  max-width: 420px;
  margin: 0 auto;
  padding: 2rem 0;

  .button {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
