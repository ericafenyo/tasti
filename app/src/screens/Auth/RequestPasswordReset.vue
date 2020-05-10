<template>
  <section class="section-no-header background-surface">
    <div class="wrapper">
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
              v-model="email"
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
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";
import { Result } from "@/data/Result";
import { Actions } from "@/store/actions";
import { HttpStatus } from "@/enums";
import { NotificationOptions } from "@/components/Notification";

@Component
export default class RequestPasswordReset extends Vue {
  email: string = "";
  isLoading: boolean = false;
  options: NotificationOptions = {};

  @Validations()
  validations = {
    email: { required, email }
  };

  resetForm() {
    this.email = "";
  }

  hideNotification() {
    this.options = { visible: false };
  }

  async onSubmit() {
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
.wrapper {
  height: 100%;
  @include phablet {
    padding-top: 3rem;
    height: initial;
  }
}
.request-reset {
  max-width: 420px;
  background-color: $white;
  border-radius: 12px;
  margin: 0 auto;
  height: 100%;

  padding: 2rem 1rem;

  @include phone {
    padding: 2rem 1.5rem;
  }
  @include phablet {
    height: initial;
  }

  .button {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
